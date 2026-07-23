// Reference copy for handoff documentation (not compiled; live source lives at the project root).
import React from "react";
function Enso({ size = 108, animated = false, ghost = true, style }) {
  return (
    <div className={"enso" + (animated ? " animated" : "")} style={{ width: size, height: size, ...style }} aria-hidden="true">
      <svg viewBox="0 0 200 200" width="100%" height="100%">
        <path className="stroke-main" d="M 158 68 A 72 72 0 1 0 168 118"></path>
        {ghost && <path className="stroke-ghost" d="M 152 62 A 78 78 0 1 0 173 122"></path>}
      </svg>
    </div>
  );
}
