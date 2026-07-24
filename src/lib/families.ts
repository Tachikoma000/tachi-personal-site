// The two poem families (design 4g, 2026-07-24). Order here is display order:
// the short breaths lead (the fast-growing family), the long tellings follow.
export interface Family {
  key: 'breath' | 'telling';
  slug: 'breaths' | 'tellings';
  name: string; // authored, fixed
  description: string; // authored, fixed — one italic line
  moreNoun: string; // singular noun for the more-link count ("breath" → "breaths")
}

export const FAMILIES: Family[] = [
  {
    key: 'breath',
    slug: 'breaths',
    name: 'the short breaths',
    description: 'small poems, read in a single breath',
    moreNoun: 'breath',
  },
  {
    key: 'telling',
    slug: 'tellings',
    name: 'the long tellings',
    description: 'life stories, told in verse',
    moreNoun: 'telling',
  },
];

export function familyOf(key: 'breath' | 'telling'): Family {
  const fam = FAMILIES.find((f) => f.key === key);
  if (!fam) throw new Error(`Unknown poem family: ${key}`);
  return fam;
}
