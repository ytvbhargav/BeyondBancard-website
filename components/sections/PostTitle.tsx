/**
 * Title text (post titles, contents labels) that never breaks inside a hyphenated word ("high-risk",
 * "Tap-to-pay"). Balanced heading wrap otherwise splits them at the hyphen on
 * narrow columns. The text itself is unchanged.
 */
export function PostTitle({ children }: { children: string }) {
  return children.split(/(\S*\w-\w\S*)/).map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    ),
  );
}
