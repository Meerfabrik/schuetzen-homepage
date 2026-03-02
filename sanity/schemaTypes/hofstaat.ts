import { defineField, defineType } from "sanity";

const KATEGORIEN = [
  { value: "koenigspaare", title: "Königspaare" },
  { value: "minister", title: "Minister" },
  { value: "ehrendamen", title: "Ehrendamen" },
  { value: "gesamtbild", title: "Gesamtbild" },
  { value: "jungkoenigin", title: "JungkönigIn" },
  { value: "ehrenkoenigin", title: "EhrenkönigIn" },
  { value: "ministerJungKoenigin", title: "Minister Jungkönigin" },
] as const;

export const hofstaatSchema = defineType({
  name: "hofstaatEintrag",
  title: "Hofstaat-Eintrag",
  type: "document",
  icon: () => "👑",

  fields: [
    defineField({
      name: "bild",
      title: "Bild",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "titel",
      title: "Titel / Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "kategorie",
      title: "Kategorie",
      type: "string",
      options: {
        list: [...KATEGORIEN],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { titel: "titel", kategorie: "kategorie", media: "bild" },
    prepare({ titel, kategorie, media }) {
      const label =
        KATEGORIEN.find((k) => k.value === kategorie)?.title ?? kategorie;
      return { title: titel ?? "Ohne Titel", subtitle: label, media };
    },
  },
});
