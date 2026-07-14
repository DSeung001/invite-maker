/** Converts stored `<br/>` / `<enter>` markers into editor newlines. */
export function toEditorLineBreaks(text: string): string {
  return text.replace(/<br\s*\/?>/gi, "\n").replace(/<enter>/gi, "\n");
}

/** Converts editor newlines (and `<enter>`) into stored `<br/>`. */
export function fromEditorLineBreaks(text: string): string {
  return text.replace(/\r\n|\r|\n/g, "<br/>").replace(/<enter>/gi, "<br/>");
}
