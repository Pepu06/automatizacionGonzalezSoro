import { google } from "googleapis";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "http://localhost:3000/api/auth/callback"
  );

  const { tokens } = await auth.getToken(code);

  // ⚠️ GUARDAR ESTO (archivo, DB, env)
  console.log("REFRESH TOKEN:", tokens.refresh_token);

  return Response.redirect("http://localhost:3000");
}
