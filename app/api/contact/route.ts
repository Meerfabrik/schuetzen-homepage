import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import type { ContactFormData } from "@/lib/types";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactFormData & { website?: string };
    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const subject = body.subject?.trim() ?? "";
    const message = body.message?.trim() ?? "";
    const honeypot = body.website?.trim() ?? "";

    if (honeypot) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Alle Felder sind Pflicht." }, { status: 400 });
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Ungültige E-Mail-Adresse." }, { status: 400 });
    }
    if (message.length > 5000 || subject.length > 200 || name.length > 200) {
      return NextResponse.json({ error: "Eingabe zu lang." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;
    const toEmail = process.env.CONTACT_TO_EMAIL;

    if (!apiKey || !fromEmail || !toEmail) {
      console.error(
        "Kontaktformular: Fehlende ENV-Variablen (RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL)."
      );
      return NextResponse.json({ error: "Serverkonfiguration unvollständig." }, { status: 500 });
    }

    const resend = new Resend(apiKey);

    const html = `
      <h2>Neue Kontaktanfrage über die Homepage</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>E-Mail:</strong> ${escapeHtml(email)}</p>
      <p><strong>Betreff:</strong> ${escapeHtml(subject)}</p>
      <p><strong>Nachricht:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
    `;

    const text = [
      "Neue Kontaktanfrage über die Homepage",
      "",
      `Name: ${name}`,
      `E-Mail: ${email}`,
      `Betreff: ${subject}`,
      "",
      "Nachricht:",
      message,
    ].join("\n");

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `[Kontaktformular] ${subject}`,
      html,
      text,
    });

    if (error) {
      console.error("Resend-Fehler:", error);
      return NextResponse.json({ error: "E-Mail konnte nicht gesendet werden." }, { status: 502 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Kontaktformular Fehler:", error);
    return NextResponse.json({ error: "Serverfehler" }, { status: 500 });
  }
}
