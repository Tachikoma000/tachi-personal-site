// Reference copy for handoff documentation (not compiled; live source lives at the project root).
import React from "react";
function SectionHeading({ title, note, style }) {
  return (
    <header style={style}>
      <h2 className="section-title">{title}</h2>
      {note && <p className="section-note">{note}</p>}
    </header>
  );
}
