import { defineField, defineType } from "sanity";

export const galerieSchema = defineType({
  name: "galerie",
  title: "Galerie",
  type: "document",
  icon: () => "🖼️",
  fields: [
    defineField({
      name: "titel",
      title: "Titel der Galerie",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "kategorie",
      title: "Kategorie",
      type: "string",
      options: {
        list: [
          { title: "Schützenkönig:innen", value: "koenige" },
          { title: "Historien Galerie", value: "historie" },
          { title: "Ehrenkönig:innen", value: "ehrenkoenige" },
          { title: "Jungschützenkönig:innen", value: "jungkoenige" },
          { title: "Veranstaltungen", value: "veranstaltungen" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "jahr",
      title: "Jahr",
      type: "number",
    }),
    defineField({
      name: "bilder",
      title: "Bilder",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Bildbeschreibung",
              type: "string",
            }),
            defineField({
              name: "caption",
              title: "Bildunterschrift",
              type: "string",
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.min(1).error("Mindestens ein Bild ist Pflicht"),
    }),
  ],
  preview: {
    select: {
      title: "titel",
      subtitle: "kategorie",
      media: "bilder.0",
    },
  },
  orderings: [
    {
      title: "Jahr (neueste zuerst)",
      name: "jahrDesc",
      by: [{ field: "jahr", direction: "desc" }],
    },
  ],
});
