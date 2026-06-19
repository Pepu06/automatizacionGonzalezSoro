import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function enviarMail({ to, subject, html }) {
  return resend.emails.send({
    from: "Impuestos Bot <onboarding@resend.dev>",
    to,
    subject,
    html,
  });
}
