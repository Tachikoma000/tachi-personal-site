import { describe, expect, it } from 'vitest';
import { parsePoem, renderLine } from '../src/lib/poem';

describe('parsePoem', () => {
  it('splits stanzas on blank lines and lines on newlines', () => {
    expect(parsePoem('a\nb\n\nc\nd')).toEqual([
      { italic: false, lines: ['a', 'b'] },
      { italic: false, lines: ['c', 'd'] },
    ]);
  });

  it('treats runs of blank lines (with stray spaces) as one break', () => {
    expect(parsePoem('a\n\n  \n\nb')).toEqual([
      { italic: false, lines: ['a'] },
      { italic: false, lines: ['b'] },
    ]);
  });

  it('ignores leading/trailing blank lines and trims line whitespace', () => {
    expect(parsePoem('\n\n  a  \nb\n\n')).toEqual([{ italic: false, lines: ['a', 'b'] }]);
  });

  it('preserves unicode and punctuation verbatim', () => {
    const line = '“The best of it arrives.” — jumped(all of us,';
    expect(parsePoem(line)[0].lines[0]).toBe(line);
  });

  it('marks a stanza wrapped in a single asterisk pair as italic', () => {
    expect(parsePoem('*go softly\ninto the field*')).toEqual([
      { italic: true, lines: ['go softly', 'into the field'] },
    ]);
  });

  it('does NOT treat multiple inline emphases as an italic stanza', () => {
    expect(parsePoem('*this* and *that*')).toEqual([
      { italic: false, lines: ['*this* and *that*'] },
    ]);
  });
});

describe('renderLine', () => {
  it('escapes HTML', () => {
    expect(renderLine('a <b> & c')).toBe('a &lt;b&gt; &amp; c');
  });

  it('renders inline emphasis', () => {
    expect(renderLine('go *softly* now')).toBe('go <em>softly</em> now');
  });

  it('leaves an unpaired asterisk alone', () => {
    expect(renderLine('5 * 3')).toBe('5 * 3');
  });
});
