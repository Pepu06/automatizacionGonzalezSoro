import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_SMTP_KEY,
  },
});

export async function enviarMail({ to, subject, html }) {
  return transporter.sendMail({
    from: `"Gestión de Impuestos" <${process.env.BREVO_FROM_EMAIL}>`,
    to,
    subject,
    html,
  });
}
