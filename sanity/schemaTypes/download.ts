import { defineField, defineType } from "sanity";

export const downloadSchema = defineType({
  name: "download",
  title: "Downloads & Dokumente",
  type: "document",
  icon: () => "📄",
  fields: [
    defineField({
      name: "name",
      title: "Dokumentname",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "beschreibung",
      title: "Beschreibung",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "kategorie",
      title: "Kategorie",
      type: "string",
      options: {
        list: [
          { title: "Mitgliedschaft", value: "mitgliedschaft" },
          { title: "Satzung & Ordnungen", value: "satzung" },
          { title: "Veranstaltungen", value: "veranstaltungen" },
          { title: "Sonstiges", value: "sonstiges" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "datei",
      title: "Datei (PDF)",
      type: "file",
      options: { accept: ".pdf,.doc,.docx" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "reihenfolge",
      title: "Reihenfolge (niedrig = oben)",
      type: "number",
      initialValue: 10,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "kategorie" },
  },
  orderings: [
    {
      title: "Reihenfolge",
      name: "reihenfolgeAsc",
      by: [{ field: "reihenfolge", direction: "asc" }],
    },
  ],
});
