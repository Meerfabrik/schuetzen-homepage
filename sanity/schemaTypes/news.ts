import { defineField, defineType } from "sanity";

export const newsSchema = defineType({
  name: "news",
  title: "News & Beiträge",
  type: "document",
  icon: () => "📰",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      validation: (Rule) => Rule.required().error("Titel ist Pflichtfeld"),
    }),
    defineField({
      name: "slug",
      title: "URL-Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required().error("Slug ist Pflichtfeld"),
    }),
    defineField({
      name: "date",
      title: "Datum",
      type: "date",
      options: { dateFormat: "DD.MM.YYYY" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Titelbild",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Bildbeschreibung (Alt-Text)",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "excerpt",
      title: "Kurzbeschreibung",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: "content",
      title: "Inhalt",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Überschrift 2", value: "h2" },
            { title: "Überschrift 3", value: "h3" },
          ],
          marks: {
            decorators: [
              { title: "Fett", value: "strong" },
              { title: "Kursiv", value: "em" },
            ],
          },
        },
        { type: "image", options: { hotspot: true } },
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "date", media: "image" },
  },
  orderings: [
    {
      title: "Datum (neueste zuerst)",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
});
