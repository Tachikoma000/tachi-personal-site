// Reference copy for handoff documentation (not compiled; live source lives at the project root).
import React from "react";
function BookCover({ title, author = "a novel \u00b7 tachi", width = 190, style }) {
  return (
    <div className="cover" style={{ width, flex: "0 0 " + width + "px", ...style }}>
      <div className="cover-title">{title}</div>
      <div className="cover-author">{author}</div>
    </div>
  );
}
