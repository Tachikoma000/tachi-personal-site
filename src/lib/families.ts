// The two poem families. Order here is display order on the poems index:
// the long tellings lead, the short breaths follow (2026-07-26).
export interface Family {
  key: 'breath' | 'telling';
  slug: 'breaths' | 'tellings';
  name: string; // authored, fixed
  description: string; // authored, fixed — one italic line
}

export const FAMILIES: Family[] = [
  {
    key: 'telling',
    slug: 'tellings',
    name: 'the long tellings',
    description: 'life stories, told in verse',
  },
  {
    key: 'breath',
    slug: 'breaths',
    name: 'the short breaths',
    description: 'small poems, read in a single breath',
  },
];

export function familyOf(key: 'breath' | 'telling'): Family {
  const fam = FAMILIES.find((f) => f.key === key);
  if (!fam) throw new Error(`Unknown poem family: ${key}`);
  return fam;
}
