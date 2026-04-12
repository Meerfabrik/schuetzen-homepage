import type { NavItem } from "./types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Aktuelles",
    href: "/aktueller-hofstaat",
    children: [
      { label: "Aktueller Hofstaat", href: "/aktueller-hofstaat" },
      { label: "News", href: "/news" },
      { label: "Termine", href: "/veranstaltungen" },
    ],
  },
  {
    label: "Über uns",
    href: "/ueber-uns",
    children: [
      { label: "Vorstand und Kompanien", href: "/ueber-uns" },
      {
        label: "Historie",
        href: "/ueber-uns/historie",
        children: [
          { label: "Schützenkönig:innen ab 1856", href: "/ueber-uns/schuetzenkoenige" },
          { label: "Präsidenten der Bruderschaft", href: "/ueber-uns/praesidenten" },
          { label: "Jungschützenkönig:innen", href: "/ueber-uns/jungschuetzenkoenige" },
          { label: "Ehrenkönig:innen ab 1970", href: "/ueber-uns/ehrenkoenige" },
        ],
      },
      { label: "Kontakt", href: "/kontakt" },
    ],
  },
  { label: "Schießsport", href: "/schiesssport" },
  {
    label: "Galerie",
    href: "/galerie",
    children: [
      { label: "Historien Galerie", href: "/galerie/historie" },
      { label: "Schützenkönig:innen Galerie", href: "/galerie/schuetzenkoenige" },
      { label: "Ehrenkönig:innen", href: "/galerie/ehrenkoenige" },
      { label: "Jungkönig:innen", href: "/galerie/jungkoenige" },
    ],
  },
  { label: "Download", href: "/download" },
  { label: "Sponsoren", href: "/sponsoren" },
];
