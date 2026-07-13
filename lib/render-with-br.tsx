import { Fragment, type ReactNode } from "react";

/** Renders text with `<br/>` / `<enter>` as line breaks; other HTML stays escaped. */
export function renderWithBr(text: string): ReactNode {
  const parts = text.split(/(?:<br\s*\/?>|<enter>)/i);
  return parts.map((part, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {part}
    </Fragment>
  ));
}
