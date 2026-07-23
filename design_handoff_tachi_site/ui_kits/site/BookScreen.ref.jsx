// Reference copy for handoff documentation (not compiled; live source lives at the project root).
import React from "react";
import { TopBar } from "../../components/navigation/TopBar.ref.jsx";
import { SectionHeading } from "../../components/writing/SectionHeading.ref.jsx";
import { PieceEntry } from "../../components/writing/PieceEntry.ref.jsx";
import { BookCover } from "../../components/book/BookCover.ref.jsx";
import { StoreLinks } from "../../components/book/StoreLinks.ref.jsx";
const WORKS = [{
  id: "handles-not-halos",
  title: "Handles, Not Halos",
  coverTitle: <React.Fragment>Handles,<br />Not Halos</React.Fragment>,
  sub: "a novel",
  excerpt: "In a city where the hum of surveillance has risen from 60\u00a0Hz to a painful 65, Aya Sato can hear what others can\u2019t\u2026",
  meta: "novel \u00b7 2025",
  illustration: "teamwork-people",
  lede: "In a city where the hum of surveillance has risen from 60\u00a0Hz to a painful 65, Aya Sato can hear what others can\u2019t: the frequency of a system evolving beyond human control.",
  body: "Chorus was supposed to save lives. Eight thousand of them, every day. The math is beautiful, undeniable \u2014 and incomplete.",
  stores: [
    { label: "barnes & noble", href: "https://www.barnesandnoble.com/w/handles-not-halos-tachi/1148448873" },
    { label: "everand", href: "https://www.everand.com/book/927296672/Handles-Not-Halos" },
    { label: "apple books", href: "https://books.apple.com/at/book/handles-not-halos/id6753576884" },
  ],
}];
function BookScreen({ onNavigate }) {
  const [workId, setWorkId] = React.useState(null);
  const work = WORKS.find((w) => w.id === workId);
  if (work) {
    return (
      <section className="view" key={work.id}>
        <TopBar active="book" onNavigate={onNavigate} />
        <a href="#" onClick={(e) => { e.preventDefault(); setWorkId(null); }}
          style={{ display: "inline-block", fontFamily: "var(--font-utility)", fontWeight: 300, fontSize: "var(--size-caption)", letterSpacing: "var(--track-nav)", textTransform: "lowercase", color: "var(--ink-soft)", marginBottom: "2.2rem" }}>{"\u2190 the shelf"}</a>
        <SectionHeading title={work.title} note={work.sub} />
        <div style={{ display: "flex", gap: "2.6rem", alignItems: "flex-start", flexWrap: "wrap" }}>
          <BookCover title={work.coverTitle} />
          <div style={{ flex: "1 1 300px" }}>
            <p className="lede" style={{ marginBottom: "1.2rem", maxWidth: "54ch" }}>{work.lede}</p>
            <p style={{ marginBottom: "1.2rem", maxWidth: "54ch" }}>{work.body}</p>
            <StoreLinks style={{ marginTop: "1.8rem" }} links={work.stores} />
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="view">
      <TopBar active="book" onNavigate={onNavigate} />
      <SectionHeading title="Books" note="the longer works" />
      {WORKS.map((w) => (
        <PieceEntry key={w.id} title={w.title} sub={w.sub} excerpt={w.excerpt} meta={w.meta} illustration={w.illustration} onClick={() => setWorkId(w.id)} />
      ))}
    </section>
  );
}
