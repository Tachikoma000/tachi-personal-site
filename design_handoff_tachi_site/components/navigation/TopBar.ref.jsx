// Reference copy for handoff documentation (not compiled; live source lives at the project root).
import React from "react";
import { Spot } from "../marks/Spot.ref.jsx";
const DEFAULT_ITEMS = [
  { id: "poems", label: "poems" },
  { id: "writings", label: "writings" },
  { id: "book", label: "books" },
  { id: "about", label: "about" },
];
function TopBar({ items = DEFAULT_ITEMS, active, onNavigate, style }) {
  return (
    <div className="topbar" style={style}>
      <button className="home-mark" aria-label="Return to arrival" onClick={() => onNavigate && onNavigate("arrival")}>
        <Spot name="bird-creature" size={34} />
      </button>
      <nav className="topnav">
        {items.map((it) => (
          <a key={it.id} href={it.href || "#"} className={active === it.id ? "here" : ""}
            onClick={(e) => { if (onNavigate) { e.preventDefault(); onNavigate(it.id); } }}>{it.label}</a>
        ))}
      </nav>
    </div>
  );
}
