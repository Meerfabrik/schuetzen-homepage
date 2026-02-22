import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

// Diese Werte nach dem Erstellen des Sanity-Projekts eintragen
// → https://sanity.io/manage
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  name: "schuetzen-buederich",
  title: "Schützenbruderschaft Büderich – CMS",

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Inhalte")
          .items([
            S.listItem()
              .title("📰 News & Beiträge")
              .schemaType("news")
              .child(S.documentTypeList("news").title("Alle Beiträge")),
            S.listItem()
              .title("👑 Aktueller Hofstaat")
              .schemaType("hofstaat")
              .child(S.documentTypeList("hofstaat").title("Hofstaat")),
            S.listItem()
              .title("🖼️ Galerie")
              .schemaType("galerie")
              .child(S.documentTypeList("galerie").title("Alle Galerien")),
            S.listItem()
              .title("📄 Downloads")
              .schemaType("download")
              .child(S.documentTypeList("download").title("Alle Downloads")),
          ]),
    }),
    visionTool(), // Zum Testen von GROQ-Queries im Studio
  ],

  schema: { types: schemaTypes },
});
