# Statische Assets

Dateien in `public/` werden unter der Wurzel-URL ausgeliefert.

- **Logo:** `public/logo.png` → erreichbar unter `/logo.png`
  - Pfad und Alt-Text sind in `lib/site.ts` konfiguriert (`SITE_LOGO`).
  - Empfohlene Formate: PNG oder SVG (transparenter Hintergrund). Für weiße Darstellung auf grünem Header ggf. in `Header.module.css` unter `.logo img` z. B. `filter: brightness(0) invert(1);` setzen.
