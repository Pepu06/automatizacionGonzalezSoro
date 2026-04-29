import { Readable } from "node:stream";
import { google } from "googleapis";

const ROOT_FOLDER_ID = "1Sa9TRwwCzVv2bqS21AQV79yBavsyPJ-s";

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_OAUTH2_CLIENT_ID,
    process.env.GOOGLE_OAUTH2_CLIENT_SECRET,
);
oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_OAUTH2_REFRESH_TOKEN });

const driveClient = google.drive({ version: "v3", auth: oauth2Client });

function escapeQuery(name) {
    return name.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

async function findFolder(parentId, name) {
    const q = `'${escapeQuery(parentId)}' in parents and name='${escapeQuery(name)}' and mimeType='application/vnd.google-apps.folder' and trashed=false`;
    const res = await driveClient.files.list({
        q,
        fields: "files(id, name)",
        pageSize: 1,
    });
    return res.data.files?.[0] ?? null;
}

export async function subirComprobanteImpuesto({ departamento, impuesto, mes, comprobante }) {
    const deptoFolder = await findFolder(ROOT_FOLDER_ID, departamento);
    if (!deptoFolder) {
        throw new Error(`Carpeta del departamento no encontrada: ${departamento}`);
    }

    const impuestoLower = impuesto.toLowerCase();
    const impuestoFolder = await findFolder(deptoFolder.id, impuestoLower);
    if (!impuestoFolder || impuestoFolder.name !== impuestoLower) {
        throw new Error(`Carpeta del impuesto no encontrada: ${impuesto}`);
    }

    if (!comprobante || typeof comprobante.arrayBuffer !== "function") {
        throw new Error("Archivo comprobante faltante");
    }

    const buffer = Buffer.from(await comprobante.arrayBuffer());
    const stream = Readable.from(buffer);

    const fileName = `${impuesto} - ${mes} - ${departamento}`;
    const mimeType = comprobante.type || "application/octet-stream";

    const uploaded = await driveClient.files.create({
        requestBody: {
            name: fileName,
            parents: [impuestoFolder.id],
        },
        media: {
            mimeType,
            body: stream,
        },
        fields: "id, name, webViewLink",
    });

    return uploaded.data;
}
