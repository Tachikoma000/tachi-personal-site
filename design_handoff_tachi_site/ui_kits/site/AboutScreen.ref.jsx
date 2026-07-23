// Reference copy for handoff documentation (not compiled; live source lives at the project root).
import React from "react";
import { TopBar } from "../../components/navigation/TopBar.ref.jsx";
import { SectionHeading } from "../../components/writing/SectionHeading.ref.jsx";
import { Spot } from "../../components/marks/Spot.ref.jsx";
const WORKS = [{
  group: "fiction",
  items: [
    { title: <em>Handles, Not Halos</em>, sub: "a novel", links: [
      { label: "barnes & noble", href: "https://www.barnesandnoble.com/w/handles-not-halos-tachi/1148448873" },
      { label: "apple books", href: "https://books.apple.com/at/book/handles-not-halos/id6753576884" },
      { label: "everand", href: "https://www.everand.com/book/927296672/Handles-Not-Halos" },
    ]},
  ],
}, {
  group: "research & instruments",
  items: [
    { title: "An open system differential vacuum calorimeter", sub: "Journal of Thermal Analysis and Calorimetry, 150, 9995\u201310005 (2025)", links: [{ label: "springer", href: "https://link.springer.com/article/10.1007/s10973-025-14348-9" }] },
    { title: "A solid-state, open-system, differential calorimeter", sub: "Review of Scientific Instruments, 91, 095102 (2020)", links: [{ label: "aip", href: "https://pubs.aip.org/aip/rsi/article-abstract/91/9/095102/910247/A-solid-state-open-system-differential-calorimeter" }] },
    { title: "VESPAIO", sub: "Volatile Evolution Sampling Probe for Advanced In-Situ Operation, Southwest Research Institute", links: [{ label: "swri", href: "https://www.swri.org/what-we-do/internal-research-development/2021/earth-space/vespaio-volatile-evolution-sampling-probe-advanced-situ-operation-15-r8934" }] },
    { title: "Raman spectral assays of planetary returned samples and terrestrial analogs", sub: "Southwest Research Institute", links: [{ label: "swri", href: "https://www.swri.org/what-we-do/internal-research-development/2021/earth-space/capability-development-raman-spectral-assays-of-planetary-returned-samples-field-based-terrestrial-analogs-15-r6083" }] },
    { title: "Far-UV studies of lunar regolith simulants", sub: "LunGradCon 2021", links: [{ label: "abstract", href: "https://impact.colorado.edu/lungradcon/2021/abstracts/Gimar_LunGradCon2021_Abstract.pdf" }] },
    { title: "AAS Division for Planetary Sciences meeting abstract", sub: "2022", links: [{ label: "ads", href: "https://ui.adsabs.harvard.edu/abs/2022DPS....5452109M/abstract" }] },
    { title: "NASA TechPort project", sub: null, links: [{ label: "techport", href: "https://techport.nasa.gov/projects/145078" }] },
  ],
}];
function AboutScreen({ onNavigate }) {
  const p = { marginBottom: "1.3rem", maxWidth: "58ch" };
  return (
    <section className="view">
      <TopBar active="about" onNavigate={onNavigate} />
      <SectionHeading title="About" note="the hand behind the ink" />
      <div>
        <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "1.35rem", lineHeight: 1.65, marginBottom: "1.6rem" }}>Tachi is the pen of Jephthah Akene.</p>
        <p style={p}>Every story earns its teller, so let me account for mine. It begins in Lagos, in a loud and loving house of five boys, where a curious child crept into the storehouse to open the bodies of dead radios and ask them what made them sing. I have been asking that question ever since. I asked it of heat, and it became instruments that measure the smallest whispers of energy. I asked it of other worlds, and it became probes built to taste the breath of moons and regolith. I asked it of machines, and it became Playgrounds, where I build with Rig, Ryzome, and the ARC ecosystem. I ask it still, of quiet anomalies at the edge of known physics, under the roof of Lattivox Labs. The boy with the screwdriver never left. He only found bigger radios.</p>
        <p style={p}>{"But an engineer's ledger is half a life. The other half lives here. The physicist and the poet were never rivals; they are twin apprentices of the same master, light, and what passes through us. So I write. Poems, musings, stories, a novel, each one another way of asking the older questions, the ones no instrument can measure. Who are we? What are we for? Where do we belong in this vast and tender world? I do not write because I have the answers. I write because the asking itself is a way of being alive, and because beauty, Monet's water, Hiroshige's skies, ink on paper, has always felt to me like evidence of something worth pursuing."}</p>
        <p style={p}>You will not find my face here. Where I come from, the drum outlives the drummer, and a story well told needs no portrait of its teller. Only my works, and the hand behind the ink.</p>
        <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "1.2rem", marginBottom: "1.6rem" }}>Handles, not halos.</p>
        <div className="thread" style={{ margin: "2.4rem 0" }}>{"physics \u2192 mechanical engineering \u2192 spacecraft & instruments \u2192 ai \u2192 playgrounds & lattivox labs \u2192 rig \u00b7 ryzome \u00b7 arc \u2192 a novel \u2192 this quiet place"}</div>
        <h2 className="section-title" style={{ marginTop: "3.5rem", fontSize: "1.7rem" }}>Selected Works</h2>
        {WORKS.map((g) => (
          <div key={g.group} style={{ marginTop: "1.8rem" }}>
            <div style={{ fontFamily: "var(--font-utility)", fontWeight: 300, fontSize: "var(--size-hint)", letterSpacing: "var(--track-poemtitle)", textTransform: "lowercase", color: "var(--accent)", marginBottom: "0.4rem" }}>{g.group}</div>
            {g.items.map((w, i) => (
              <div key={i} style={{ padding: "1.1rem 0.2rem", borderTop: "1px solid var(--hairline)", transition: "border-color var(--transition-sky)" }}>
                <div style={{ fontSize: "1.05rem" }}>{w.title}</div>
                {w.sub && <div style={{ fontStyle: "italic", color: "var(--ink-soft)", fontSize: "0.9rem", marginTop: "0.15rem" }}>{w.sub}</div>}
                <div className="stores" style={{ marginTop: "0.6rem" }}>
                  {w.links.map((l) => <a key={l.label} href={l.href} target="_blank" rel="noopener">{l.label}</a>)}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <Spot name="continuous-line" size={64} style={{ margin: "3.5rem auto 0" }} />
    </section>
  );
}
