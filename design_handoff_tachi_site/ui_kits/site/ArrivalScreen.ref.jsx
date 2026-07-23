// Reference copy for handoff documentation (not compiled; live source lives at the project root).
import React from "react";
import { Spot } from "../../components/marks/Spot.ref.jsx";
import { Epigraph } from "../../components/writing/Epigraph.ref.jsx";
import { PathList } from "../../components/navigation/PathList.ref.jsx";
function ArrivalScreen({ onNavigate }) {
  return (
    <section className="view" style={{ textAlign: "center", paddingTop: "15vh" }}>
      <Spot name="bird-creature" size={104} style={{ margin: "0 auto 2.2rem" }} />
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "var(--size-hero)", letterSpacing: "var(--track-hero)", textIndent: "var(--track-hero)", textTransform: "lowercase", transition: "color var(--transition-sky)" }}>tachi</h1>
      <p className="whisper" style={{ marginTop: "0.9rem" }}>writings &middot; poems &middot; musings &middot; beauty</p>
      <Epigraph attribution="the knock" style={{ marginTop: "4.2rem", maxWidth: "none" }}>{"\u201cThe best of it arrives. It is not made.\u201d"}</Epigraph>
      <PathList style={{ marginTop: "5.5rem" }} onNavigate={onNavigate} paths={[
        { id: "poems", name: "Poems", hint: "the shorter breaths" },
        { id: "writings", name: "Writings", hint: "essays & musings" },
        { id: "book", name: "Books", hint: "the longer works" },
        { id: "about", name: "About", hint: "the hand behind the ink" },
      ]} />
    </section>
  );
}
