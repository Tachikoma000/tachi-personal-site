// Reference copy for handoff documentation (not compiled; live source lives at the project root).
import React from "react";
function StoreLinks({ links = [], style }) {
  return (
    <div className="stores" style={style}>
      {links.map((l) => <a key={l.label} href={l.href} target="_blank" rel="noopener">{l.label}</a>)}
    </div>
  );
}
