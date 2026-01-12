import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export async function enviarMail({ to, subject, html }) {
  return transporter.sendMail({
    from: `"Impuestos Bot 🤖" <${process.env.MAIL_USER}>`,
    to,
    subject,
    html,
  });
}
