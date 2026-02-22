import { NextRequest, NextResponse } from "next/server";
import type { ContactFormData } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Alle Felder sind Pflicht." }, { status: 400 });
    }

    // ── OPTION A: Mit Resend (empfohlen) ──────────────────────────────────────
    // 1. npm install resend
    // 2. .env.local anlegen (siehe .env.example)
    // 3. Diesen Block aktivieren:

    // const { Resend } = await import("resend");
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "kontakt@schuetzen-buederich.de",
    //   to: process.env.CONTACT_EMAIL!,
    //   subject: `[Kontaktformular] ${subject}`,
    //   html: `
    //     <h2>Neue Kontaktanfrage</h2>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>E-Mail:</strong> ${email}</p>
    //     <p><strong>Betreff:</strong> ${subject}</p>
    //     <p><strong>Nachricht:</strong><br>${message.replace(/\n/g, "<br>")}</p>
    //   `,
    // });

    // ── OPTION B: Nur Logging (zum Testen) ───────────────────────────────────
    console.log("📬 Neue Kontaktanfrage:", { name, email, subject, message });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Kontaktformular Fehler:", error);
    return NextResponse.json({ error: "Serverfehler" }, { status: 500 });
  }
}
