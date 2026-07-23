// Reference copy for handoff documentation (not compiled; live source lives at the project root).
import React from "react";
function Mei({ text = "handles, not halos", fixed = true, style }) {
  return <div className="mei" aria-hidden="true" style={{ ...(fixed ? null : { position: "absolute" }), ...style }}>{text}</div>;
}
