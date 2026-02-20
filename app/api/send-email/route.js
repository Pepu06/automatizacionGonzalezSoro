import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
    const { deudores } = await req.json();

    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
        return NextResponse.json(
            {
                error: "Faltan credenciales de email",
                details: "Configurar GMAIL_USER y GMAIL_PASS",
            },
            { status: 500 }
        );
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
        },
    });

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
            // Crear lista HTML de deudas
            const listaDeudas = deudor.deudas
                .map(
                    (deuda) =>
                        `<li><strong>${deuda.impuesto}</strong> - ${deuda.mes}</li>`
                )
                .join("");

            return transporter.sendMail({
                from: '"Gestión de Impuestos" <' + process.env.GMAIL_USER + ">",
                to: deudor.email,
                subject: `Recordatorio de pagos pendientes - ${deudor.departamento}`,
                html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #dc2626;">Recordatorio de Pagos Pendientes</h2>
            <p>Hola <strong>${deudor.nombre}</strong>,</p>
            <p>Te informamos que tenés los siguientes impuestos pendientes correspondientes a tu departamento <strong>${deudor.departamento}</strong>:</p>
            
            <div style="background-color: #fef2f2; border-left: 4px solid #dc2626; padding: 15px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #991b1b;">Impuestos pendientes (${deudor.deudas.length}):</h3>
              <ul style="color: #7f1d1d;">
                ${listaDeudas}
              </ul>
            </div>
            
            <p>Por favor, realizá el pago a la brevedad para evitar recargos.</p>
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