"use client";

import { useState } from "react";
import type { ContactFormData, FormStatus } from "@/lib/types";
import styles from "./ContactForm.module.css";

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="name">Name *</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Euer Name"
            required
            disabled={status === "loading"}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="email">E-Mail *</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="eure@email.de"
            required
            disabled={status === "loading"}
          />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="subject">Betreff *</label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={form.subject}
          onChange={handleChange}
          placeholder="Worum geht es?"
          required
          disabled={status === "loading"}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="message">Nachricht *</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Eure Nachricht an uns..."
          required
          disabled={status === "loading"}
        />
      </div>

      <button
        type="submit"
        className={`btn btn-primary ${styles.submitBtn}`}
        disabled={status === "loading"}
      >
        {status === "loading" ? "Wird gesendet..." : "Nachricht senden →"}
      </button>

      {status === "success" && (
        <div className={styles.success}>
          ✅ Vielen Dank! Eure Nachricht wurde erfolgreich gesendet. Wir melden uns bald!
        </div>
      )}
      {status === "error" && (
        <div className={styles.error}>
          ❌ Es ist ein Fehler aufgetreten. Bitte versucht es erneut oder schreibt uns direkt auf Facebook.
        </div>
      )}
    </form>
  );
}
