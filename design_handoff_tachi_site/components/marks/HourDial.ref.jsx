// Reference copy for handoff documentation (not compiled; live source lives at the project root).
import React from "react";
const HOURS = [["dawn", "dawn"], ["morning", "morning"], ["midday", "midday"], ["dusk", "dusk"], ["bleue", "l\u2019heure bleue"], ["night", "night"]];
function HourDial({ hour = "midday", onChange, floating = true, style }) {
  return (
    <div className={"dial" + (floating ? " floating" : "")} role="group" aria-label="Preview the light at different hours" style={style}>
      {HOURS.map(([id, label]) => (
        <button key={id} aria-pressed={hour === id} onClick={() => onChange && onChange(id)}>{label}</button>
      ))}
    </div>
  );
}
function hourOf(now) {
  const h = now.getHours();
  if (h >= 5 && h < 8) return "dawn";
  if (h >= 8 && h < 12) return "morning";
  if (h >= 12 && h < 16) return "midday";
  if (h >= 16 && h < 19) return "dusk";
  if (h >= 19 && h < 21) return "bleue";
  return "night";
}
