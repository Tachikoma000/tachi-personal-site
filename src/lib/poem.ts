export interface Stanza {
  lines: string[];
  italic: boolean;
}

/** Blank line(s) = stanza break; newline = line break; a stanza whose only
 *  two asterisks are its first and last characters renders entirely in <em>. */
export function parsePoem(body: string): Stanza[] {
  return body
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter((block) => block.length > 0)
    .map((block) => {
      const asterisks = (block.match(/\*/g) ?? []).length;
      const wrapped = asterisks === 2 && block.startsWith('*') && block.endsWith('*');
      const text = wrapped ? block.slice(1, -1).trim() : block;
      return {
        italic: wrapped,
        lines: text
          .split('\n')
          .map((line) => line.trim())
          .filter((line) => line.length > 0),
      };
    });
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** Escape a poem line for HTML, then apply `*inline emphasis*`. */
export function renderLine(line: string): string {
  return escapeHtml(line).replace(/\*([^*]+)\*/g, '<em>$1</em>');
}
