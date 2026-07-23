// Reference copy for handoff documentation (not compiled; live source lives at the project root).
import React from "react";
function PathList({ paths = [], onNavigate, style }) {
  return (
    <nav className="paths" aria-label="Site sections" style={style}>
      {paths.map((p) => (
        <a key={p.name} href={p.href || "#"}
          onClick={(e) => { if (p.onClick || (onNavigate && p.id)) { e.preventDefault(); p.onClick ? p.onClick() : onNavigate(p.id); } }}>
          <span className="path-name">{p.name}</span>
          {p.hint && <span className="path-hint">{p.hint}</span>}
        </a>
      ))}
    </nav>
  );
}
