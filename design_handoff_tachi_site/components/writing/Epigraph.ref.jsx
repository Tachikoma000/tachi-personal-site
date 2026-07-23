// Reference copy for handoff documentation (not compiled; live source lives at the project root).
import React from "react";
function Epigraph({ children, attribution, style }) {
  return (
    <blockquote className="epigraph" style={style}>
      {children}
      {attribution && <span className="attr">{"\u2014 " + attribution}</span>}
    </blockquote>
  );
}
