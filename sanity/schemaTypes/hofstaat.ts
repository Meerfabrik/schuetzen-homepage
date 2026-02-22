import { defineField, defineType } from "sanity";

export const hofstaatSchema = defineType({
  name: "hofstaat",
  title: "Aktueller Hofstaat",
  type: "document",
  icon: () => "👑",

  fields: [
    defineField({
      name: "regentschaftsjahr",
      title: "Regentschaftsjahr (z.B. 2024 / 2025)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "koenigName",
      title: "Name des Königs",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "koeniginName",
      title: "Name der Königin",
      type: "string",
    }),
    defineField({
      name: "koenigBild",
      title: "Foto des Königspaares",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "hofstaatMitglieder",
      title: "Hofstaat-Mitglieder",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "rolle", title: "Rolle", type: "string" }),
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({
              name: "bild",
              title: "Foto",
              type: "image",
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: { title: "rolle", subtitle: "name", media: "bild" },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "regentschaftsjahr", subtitle: "koenigName", media: "koenigBild" },
  },
});
