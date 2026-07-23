// Reference copy for handoff documentation (not compiled; live source lives at the project root).
import React from "react";
import { Spot } from "../marks/Spot.ref.jsx";
function Poem({ title, lines, children, tailpiece, style }) {
  return (
    <div style={style}>
      {title && <div className="poem-title">{title}</div>}
      <div className="poem">
        {children || (lines || []).map((l, i) => <React.Fragment key={i}>{l}<br /></React.Fragment>)}
      </div>
      {tailpiece && <Spot name={tailpiece} size={72} style={{ margin: "3.2rem auto 0" }} />}
    </div>
  );
}
