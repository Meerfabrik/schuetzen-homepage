import { defineField, defineType } from "sanity";

export const appointmentsSchema = defineType({
  name: "appointments",
  title: "Termine & Veranstaltungen",
  type: "document",
  icon: () => "📅",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      validation: (Rule) => Rule.required().error("Titel ist Pflichtfeld"),
    }),
    defineField({
      name: "startDate",
      title: "Startdatum & -zeit",
      type: "datetime",
      options: {
        dateFormat: "DD.MM.YYYY",
        timeFormat: "HH:mm",
        timeStep: 15,
      },
      validation: (Rule) => Rule.required().error("Startdatum ist Pflichtfeld"),
    }),
    defineField({
      name: "endDate",
      title: "Enddatum & -zeit (optional)",
      type: "datetime",
      options: {
        dateFormat: "DD.MM.YYYY",
        timeFormat: "HH:mm",
        timeStep: 15,
      },
      description: "Optional. Ohne Enddatum wird nur der Start angezeigt.",
    }),
    defineField({
      name: "location",
      title: "Ort",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Beschreibung",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "image",
      title: "Bild",
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
      name: "link",
      title: "Link (z. B. Anmeldung)",
      type: "url",
    }),
    defineField({
      name: "isActive",
      title: "Aktiv",
      type: "boolean",
      initialValue: true,
      description: "Nur aktive Termine werden angezeigt.",
    }),
    defineField({
      name: "isPublished",
      title: "Veröffentlicht",
      type: "boolean",
      initialValue: true,
      description: "Veröffentlichte Termine erscheinen auf der Website.",
    }),
    defineField({
      name: "isDeleted",
      title: "Gelöscht (soft)",
      type: "boolean",
      initialValue: false,
      hidden: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      startDate: "startDate",
      endDate: "endDate",
      media: "image",
    },
    prepare({ title, startDate, endDate, media }) {
      const start = startDate
        ? new Date(startDate).toLocaleString("de-DE", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        : "–";
      const end = endDate
        ? new Date(endDate).toLocaleString("de-DE", {
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
          })
        : null;
      const range = end ? `${start} – ${end}` : start;
      return {
        title: title || "Ohne Titel",
        subtitle: range,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Startdatum (früheste zuerst)",
      name: "startDateAsc",
      by: [{ field: "startDate", direction: "asc" }],
    },
    {
      title: "Startdatum (späteste zuerst)",
      name: "startDateDesc",
      by: [{ field: "startDate", direction: "desc" }],
    },
  ],
});
