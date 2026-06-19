import { NextResponse } from "next/server";
import { enviarMail } from "../lib/mailer";

export async function POST(req) {
    const { deudores } = await req.json();

    if (!process.env.BREVO_USER || !process.env.BREVO_SMTP_KEY) {
        return NextResponse.json(
            {
                error: "Faltan credenciales de email",
                details: "Configurar BREVO_USER y BREVO_SMTP_KEY",
            },
            { status: 500 }
        );
    }

    try {
        const deudoresValidos = (deudores || []).filter(
            (deudor) => deudor?.email
        );
        const omitidos = (deudores || []).filter((deudor) => !deudor?.email);

        if (deudoresValidos.length === 0) {
            return NextResponse.json(
                {
                    message: "No hay emails válidos para enviar",
                    enviados: 0,
                    omitidos: omitidos.length,
                },
                { status: 200 }
            );
        }

        const emailPromises = deudoresValidos.map((deudor) => {
            const listaDeudas = deudor.deudas
                .map(
                    (deuda) =>
                        `<li><strong>${deuda.impuesto}</strong> - ${deuda.mes}</li>`
                )
                .join("");

            return enviarMail({
                to: deudor.email,
                subject: `Recordatorio de comprobante pendiente - ${deudor.departamento}`,
                html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #dc2626;">Recordatorio de Envío de Comprobante</h2>
            <p>Hola <strong>${deudor.nombre}</strong>,</p>
            <p>Te informamos que falta enviar el comprobante de pago de los siguientes impuestos correspondientes a tu departamento <strong>${deudor.departamento}</strong>:</p>

            <div style="background-color: #fef2f2; border-left: 4px solid #dc2626; padding: 15px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #991b1b;">Comprobantes pendientes (${deudor.deudas.length}):</h3>
              <ul style="color: #7f1d1d;">
                ${listaDeudas}
              </ul>
            </div>

            <p>Por favor, enviá el comprobante a la brevedad para evitar recargos.</p>
            <br>
            <p>Saludos,</p>
            <p><strong>Administración</strong></p>
          </div>
        `,
            });
        });

        await Promise.all(emailPromises);
        return NextResponse.json({
            message: "Emails enviados correctamente",
            enviados: deudoresValidos.length,
            omitidos: omitidos.length,
        });
    } catch (error) {
        console.error("Error enviando emails:", error);
        return NextResponse.json(
            { error: "Error enviando emails" },
            { status: 500 }
        );
    }
}
