// Reference copy for handoff documentation (not compiled; live source lives at the project root).
import React from "react";
function dsRoot() {
  if (typeof document === "undefined") return "";
  const s = Array.from(document.scripts).find((x) => x.src && x.src.indexOf("_ds_bundle.js") !== -1);
  return s ? s.src.slice(0, s.src.lastIndexOf("_ds_bundle.js")) : "";
}
function Spot({ name, size = 88, src, alt = "", style }) {
  return (
    <span className="spot" style={{ width: size, height: size, ...style }} aria-hidden={alt ? undefined : "true"}>
      <img src={src || dsRoot() + "assets/illustrations/" + name + ".svg"} alt={alt} />
    </span>
  );
}
