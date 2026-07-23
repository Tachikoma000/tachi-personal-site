// Reference copy for handoff documentation (not compiled; live source lives at the project root).
import React from "react";
function Sky({ height = "52vh", style }) {
  return <div className="sky" aria-hidden="true" style={{ height, ...style }}></div>;
}
