import { defineField, defineType } from "sanity";

export const kompanieSchema = defineType({
  name: "kompanie",
  title: "Kompanie",
  type: "document",
  icon: () => "⚔️",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required().error("Name ist Pflichtfeld"),
    }),
    defineField({
      name: "hauptmann",
      title: "Hauptmann / Hauptfrau",
      type: "string",
      description: "Name und Rang (z. B. Hauptmann Max Mustermann)",
    }),
    defineField({
      name: "webseite",
      title: "Webseite",
      type: "url",
      description: "Externe Website der Kompanie",
    }),
    defineField({
      name: "adresse",
      title: "Adresse",
      type: "string",
      description: "Geschäftsadresse der Kompanie (optional)",
    }),
    defineField({
      name: "hinweis",
      title: "Hinweis",
      type: "string",
      description: 'Optionaler Hinweis (z. B. "zur Zeit ruhend")',
    }),
    defineField({
      name: "reihenfolge",
      title: "Reihenfolge",
      type: "number",
      description: "Sortierung (kleinere Zahl = weiter oben)",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "hauptmann",
    },
    prepare({ title, subtitle }) {
      return {
        title: title ?? "Ohne Name",
        subtitle: subtitle ?? "–",
      };
    },
  },
  orderings: [
    {
      title: "Reihenfolge",
      name: "reihenfolgeAsc",
      by: [{ field: "reihenfolge", direction: "asc" }],
    },
    {
      title: "Name (A–Z)",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
});
