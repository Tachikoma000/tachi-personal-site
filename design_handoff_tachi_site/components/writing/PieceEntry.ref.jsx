// Reference copy for handoff documentation (not compiled; live source lives at the project root).
import React from "react";
import { Spot } from "../marks/Spot.ref.jsx";
function PieceEntry({ title, sub, excerpt, meta, href, onClick, illustration, style }) {
  const interactive = !!(href || onClick);
  const body = (
    <React.Fragment>
      <div className="piece-title">{title}</div>
      {sub && <div className="piece-sub">{sub}</div>}
      {excerpt && <p className="piece-excerpt">{excerpt}</p>}
      {meta && <div className="piece-meta">{meta}</div>}
    </React.Fragment>
  );
  const inner = illustration
    ? <div style={{ display: "flex", gap: "1.8rem", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ minWidth: 0 }}>{body}</div>
        <Spot name={illustration} size={72} style={{ flex: "none" }} />
      </div>
    : body;
  if (interactive) {
    return (
      <a className="piece piece-link" href={href || "#"} style={{ display: "block", color: "inherit", ...style }}
        onClick={(e) => { if (onClick) { e.preventDefault(); onClick(); } }}>{inner}</a>
    );
  }
  return <article className="piece" style={style}>{inner}</article>;
}
