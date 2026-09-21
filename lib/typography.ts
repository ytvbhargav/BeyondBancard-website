// Line-breaking helpers for copy in content files. The visible text never changes;
// only where a line may break does (D-057, D-058).

/** Non-breaking space (U+00A0). Archivo and IBM Plex both have the glyph. */
export const NBSP = "\u00a0";

/**
 * Keeps a hyphenated compound on one line by putting a word joiner (U+2060, invisible,
 * no glyph needed) after each hyphen. Archivo and IBM Plex have no U+2011 glyph, so a
 * non-breaking hyphen would render from a fallback font.
 */
export function keepTogether(compound: string): string {
  return compound.replaceAll("-", "-\u2060");
}

/**
 * Keeps each flow arrow with the stage it points to, so a line can only break before an
 * arrow ("Settlement" / "→ Bank Availability") and never leaves one trailing.
 */
export function keepArrows(chain: string): string {
  return chain.replaceAll("→ ", `→${NBSP}`);
}
