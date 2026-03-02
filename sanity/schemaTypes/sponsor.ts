import { defineField, defineType } from "sanity";

export const sponsorSchema = defineType({
  name: "sponsor",
  title: "Sponsor",
  type: "document",
  icon: () => "🤝",
  fields: [
    defineField({
      name: "title",
      title: "Titel / Name",
      type: "string",
      description: "Name des Sponsors (z. B. Firma oder Organisation)",
      validation: (Rule) => Rule.required().error("Titel ist Pflichtfeld"),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Bildbeschreibung (Alt-Text)",
          type: "string",
          description: "Kurzbeschreibung des Logos für Barrierefreiheit",
        }),
      ],
      validation: (Rule) => Rule.required().error("Logo ist Pflichtfeld"),
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "url",
      description: "Website des Sponsors – wird beim Klick auf die Karte geöffnet",
    }),
    defineField({
      name: "ebene",
      title: "Ebene / Kategorie",
      type: "string",
      options: {
        list: [
          { title: "Hauptsponsor", value: "hauptsponsor" },
          { title: "Sponsor", value: "sponsor" },
          { title: "Partner", value: "partner" },
          { title: "Förderer", value: "foerderer" },
        ],
      },
      validation: (Rule) => Rule.required().error("Ebene ist Pflichtfeld"),
    }),
    defineField({
      name: "reihenfolge",
      title: "Reihenfolge",
      type: "number",
      description: "Optionale Sortierung innerhalb der Ebene (kleinere Zahl = weiter oben)",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "ebene",
      media: "logo",
    },
    prepare({ title, subtitle }) {
      const labels: Record<string, string> = {
        hauptsponsor: "Hauptsponsor",
        sponsor: "Sponsor",
        partner: "Partner",
        foerderer: "Förderer",
      };
      return {
        title: title ?? "Ohne Titel",
        subtitle: labels[subtitle as string] ?? subtitle,
      };
    },
  },
  orderings: [
    {
      title: "Reihenfolge (aufsteigend)",
      name: "reihenfolgeAsc",
      by: [{ field: "reihenfolge", direction: "asc" }],
    },
    {
      title: "Titel (A–Z)",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
});
