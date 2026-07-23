// Reference copy for handoff documentation (not compiled; live source lives at the project root).
import React from "react";
function QuietField({ placeholder = "your email, if you\u2019d like word", action = "send", onSubmit, style }) {
  const [value, setValue] = React.useState("");
  return (
    <form className="quiet-field" style={style} onSubmit={(e) => { e.preventDefault(); onSubmit && onSubmit(value); }}>
      <input type="email" value={value} placeholder={placeholder} onChange={(e) => setValue(e.target.value)} aria-label="email address" />
      <button type="submit">{action}</button>
    </form>
  );
}
