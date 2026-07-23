/* @ds-bundle: {"format":4,"namespace":"TachiDesignSystem_f7b325","components":[{"name":"BookCover","sourcePath":"components/book/BookCover.jsx"},{"name":"StoreLinks","sourcePath":"components/book/StoreLinks.jsx"},{"name":"Colophon","sourcePath":"components/colophon/Colophon.jsx"},{"name":"QuietField","sourcePath":"components/forms/QuietField.jsx"},{"name":"Enso","sourcePath":"components/marks/Enso.jsx"},{"name":"HourDial","sourcePath":"components/marks/HourDial.jsx"},{"name":"Mei","sourcePath":"components/marks/Mei.jsx"},{"name":"Sky","sourcePath":"components/marks/Sky.jsx"},{"name":"Spot","sourcePath":"components/marks/Spot.jsx"},{"name":"Washi","sourcePath":"components/marks/Washi.jsx"},{"name":"PathList","sourcePath":"components/navigation/PathList.jsx"},{"name":"TopBar","sourcePath":"components/navigation/TopBar.jsx"},{"name":"Epigraph","sourcePath":"components/writing/Epigraph.jsx"},{"name":"PieceEntry","sourcePath":"components/writing/PieceEntry.jsx"},{"name":"Poem","sourcePath":"components/writing/Poem.jsx"},{"name":"SectionHeading","sourcePath":"components/writing/SectionHeading.jsx"},{"name":"AboutScreen","sourcePath":"ui_kits/site/AboutScreen.jsx"},{"name":"ArrivalScreen","sourcePath":"ui_kits/site/ArrivalScreen.jsx"},{"name":"BookScreen","sourcePath":"ui_kits/site/BookScreen.jsx"},{"name":"PoemsScreen","sourcePath":"ui_kits/site/PoemsScreen.jsx"},{"name":"PIECES","sourcePath":"ui_kits/site/WritingsScreen.jsx"},{"name":"WritingsScreen","sourcePath":"ui_kits/site/WritingsScreen.jsx"}],"sourceHashes":{"components/book/BookCover.jsx":"d287ccb7ece1","components/book/StoreLinks.jsx":"7c89958e4fe4","components/colophon/Colophon.jsx":"d03ca9a98a05","components/forms/QuietField.jsx":"91924b3b210a","components/marks/Enso.jsx":"c2c9853361c4","components/marks/HourDial.jsx":"154f9b2fc22e","components/marks/Mei.jsx":"2deef9c50e60","components/marks/Sky.jsx":"f1be218ab752","components/marks/Spot.jsx":"e9ce024560fe","components/marks/Washi.jsx":"17a8459a303f","components/navigation/PathList.jsx":"3af7af804a19","components/navigation/TopBar.jsx":"6ee345f4c0ed","components/writing/Epigraph.jsx":"3ce0e1181837","components/writing/PieceEntry.jsx":"564af8a41e0e","components/writing/Poem.jsx":"d4b091c36d79","components/writing/SectionHeading.jsx":"7283bbe9f1cf","ui_kits/site/AboutScreen.jsx":"fc556c957123","ui_kits/site/ArrivalScreen.jsx":"490c74fc9f5a","ui_kits/site/BookScreen.jsx":"6150893e9ebc","ui_kits/site/PoemsScreen.jsx":"8d1cf02e7e54","ui_kits/site/WritingsScreen.jsx":"ee40edc733ce"},"inlinedExternals":[],"unexposedExports":[{"name":"hourOf","sourcePath":"components/marks/HourDial.jsx"}]} */

(() => {

const __ds_ns = (window.TachiDesignSystem_f7b325 = window.TachiDesignSystem_f7b325 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/book/BookCover.jsx
try { (() => {
function BookCover({
  title,
  author = "a novel \u00b7 tachi",
  width = 190,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "cover",
    style: {
      width,
      flex: "0 0 " + width + "px",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "cover-title"
  }, title), /*#__PURE__*/React.createElement("div", {
    className: "cover-author"
  }, author));
}
Object.assign(__ds_scope, { BookCover });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/book/BookCover.jsx", error: String((e && e.message) || e) }); }

// components/book/StoreLinks.jsx
try { (() => {
function StoreLinks({
  links = [],
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "stores",
    style: style
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.label,
    href: l.href,
    target: "_blank",
    rel: "noopener"
  }, l.label)));
}
Object.assign(__ds_scope, { StoreLinks });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/book/StoreLinks.jsx", error: String((e && e.message) || e) }); }

// components/colophon/Colophon.jsx
try { (() => {
function Colophon({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "colophon",
    style: style
  }, children);
}
Object.assign(__ds_scope, { Colophon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/colophon/Colophon.jsx", error: String((e && e.message) || e) }); }

// components/forms/QuietField.jsx
try { (() => {
function QuietField({
  placeholder = "your email, if you\u2019d like word",
  action = "send",
  onSubmit,
  style
}) {
  const [value, setValue] = React.useState("");
  return /*#__PURE__*/React.createElement("form", {
    className: "quiet-field",
    style: style,
    onSubmit: e => {
      e.preventDefault();
      onSubmit && onSubmit(value);
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "email",
    value: value,
    placeholder: placeholder,
    onChange: e => setValue(e.target.value),
    "aria-label": "email address"
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit"
  }, action));
}
Object.assign(__ds_scope, { QuietField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/QuietField.jsx", error: String((e && e.message) || e) }); }

// components/marks/Enso.jsx
try { (() => {
function Enso({
  size = 108,
  animated = false,
  ghost = true,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "enso" + (animated ? " animated" : ""),
    style: {
      width: size,
      height: size,
      ...style
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 200 200",
    width: "100%",
    height: "100%"
  }, /*#__PURE__*/React.createElement("path", {
    className: "stroke-main",
    d: "M 158 68 A 72 72 0 1 0 168 118"
  }), ghost && /*#__PURE__*/React.createElement("path", {
    className: "stroke-ghost",
    d: "M 152 62 A 78 78 0 1 0 173 122"
  })));
}
Object.assign(__ds_scope, { Enso });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marks/Enso.jsx", error: String((e && e.message) || e) }); }

// components/marks/HourDial.jsx
try { (() => {
const HOURS = [["dawn", "dawn"], ["morning", "morning"], ["midday", "midday"], ["dusk", "dusk"], ["bleue", "l\u2019heure bleue"], ["night", "night"]];
function HourDial({
  hour = "midday",
  onChange,
  floating = true,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "dial" + (floating ? " floating" : ""),
    role: "group",
    "aria-label": "Preview the light at different hours",
    style: style
  }, HOURS.map(([id, label]) => /*#__PURE__*/React.createElement("button", {
    key: id,
    "aria-pressed": hour === id,
    onClick: () => onChange && onChange(id)
  }, label)));
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
Object.assign(__ds_scope, { HourDial, hourOf });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marks/HourDial.jsx", error: String((e && e.message) || e) }); }

// components/marks/Mei.jsx
try { (() => {
function Mei({
  text = "handles, not halos",
  fixed = true,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "mei",
    "aria-hidden": "true",
    style: {
      ...(fixed ? null : {
        position: "absolute"
      }),
      ...style
    }
  }, text);
}
Object.assign(__ds_scope, { Mei });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marks/Mei.jsx", error: String((e && e.message) || e) }); }

// components/marks/Sky.jsx
try { (() => {
function Sky({
  height = "52vh",
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "sky",
    "aria-hidden": "true",
    style: {
      height,
      ...style
    }
  });
}
Object.assign(__ds_scope, { Sky });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marks/Sky.jsx", error: String((e && e.message) || e) }); }

// components/marks/Spot.jsx
try { (() => {
function dsRoot() {
  if (typeof document === "undefined") return "";
  const s = Array.from(document.scripts).find(x => x.src && x.src.indexOf("_ds_bundle.js") !== -1);
  return s ? s.src.slice(0, s.src.lastIndexOf("_ds_bundle.js")) : "";
}
function Spot({
  name,
  size = 88,
  src,
  alt = "",
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: "spot",
    style: {
      width: size,
      height: size,
      ...style
    },
    "aria-hidden": alt ? undefined : "true"
  }, /*#__PURE__*/React.createElement("img", {
    src: src || dsRoot() + "assets/illustrations/" + name + ".svg",
    alt: alt
  }));
}
Object.assign(__ds_scope, { Spot });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marks/Spot.jsx", error: String((e && e.message) || e) }); }

// components/marks/Washi.jsx
try { (() => {
function Washi() {
  return /*#__PURE__*/React.createElement("div", {
    className: "washi",
    "aria-hidden": "true"
  });
}
Object.assign(__ds_scope, { Washi });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marks/Washi.jsx", error: String((e && e.message) || e) }); }

// components/navigation/PathList.jsx
try { (() => {
function PathList({
  paths = [],
  onNavigate,
  style
}) {
  return /*#__PURE__*/React.createElement("nav", {
    className: "paths",
    "aria-label": "Site sections",
    style: style
  }, paths.map(p => /*#__PURE__*/React.createElement("a", {
    key: p.name,
    href: p.href || "#",
    onClick: e => {
      if (p.onClick || onNavigate && p.id) {
        e.preventDefault();
        p.onClick ? p.onClick() : onNavigate(p.id);
      }
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "path-name"
  }, p.name), p.hint && /*#__PURE__*/React.createElement("span", {
    className: "path-hint"
  }, p.hint))));
}
Object.assign(__ds_scope, { PathList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/PathList.jsx", error: String((e && e.message) || e) }); }

// components/navigation/TopBar.jsx
try { (() => {
const DEFAULT_ITEMS = [{
  id: "poems",
  label: "poems"
}, {
  id: "writings",
  label: "writings"
}, {
  id: "book",
  label: "books"
}, {
  id: "about",
  label: "about"
}];
function TopBar({
  items = DEFAULT_ITEMS,
  active,
  onNavigate,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "topbar",
    style: style
  }, /*#__PURE__*/React.createElement("button", {
    className: "home-mark",
    "aria-label": "Return to arrival",
    onClick: () => onNavigate && onNavigate("arrival")
  }, /*#__PURE__*/React.createElement(__ds_scope.Spot, {
    name: "bird-creature",
    size: 34
  })), /*#__PURE__*/React.createElement("nav", {
    className: "topnav"
  }, items.map(it => /*#__PURE__*/React.createElement("a", {
    key: it.id,
    href: it.href || "#",
    className: active === it.id ? "here" : "",
    onClick: e => {
      if (onNavigate) {
        e.preventDefault();
        onNavigate(it.id);
      }
    }
  }, it.label))));
}
Object.assign(__ds_scope, { TopBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/TopBar.jsx", error: String((e && e.message) || e) }); }

// components/writing/Epigraph.jsx
try { (() => {
function Epigraph({
  children,
  attribution,
  style
}) {
  return /*#__PURE__*/React.createElement("blockquote", {
    className: "epigraph",
    style: style
  }, children, attribution && /*#__PURE__*/React.createElement("span", {
    className: "attr"
  }, "\u2014 " + attribution));
}
Object.assign(__ds_scope, { Epigraph });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/writing/Epigraph.jsx", error: String((e && e.message) || e) }); }

// components/writing/PieceEntry.jsx
try { (() => {
function PieceEntry({
  title,
  sub,
  excerpt,
  meta,
  href,
  onClick,
  illustration,
  style
}) {
  const interactive = !!(href || onClick);
  const body = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "piece-title"
  }, title), sub && /*#__PURE__*/React.createElement("div", {
    className: "piece-sub"
  }, sub), excerpt && /*#__PURE__*/React.createElement("p", {
    className: "piece-excerpt"
  }, excerpt), meta && /*#__PURE__*/React.createElement("div", {
    className: "piece-meta"
  }, meta));
  const inner = illustration ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "1.8rem",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, body), /*#__PURE__*/React.createElement(__ds_scope.Spot, {
    name: illustration,
    size: 72,
    style: {
      flex: "none"
    }
  })) : body;
  if (interactive) {
    return /*#__PURE__*/React.createElement("a", {
      className: "piece piece-link",
      href: href || "#",
      style: {
        display: "block",
        color: "inherit",
        ...style
      },
      onClick: e => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }
    }, inner);
  }
  return /*#__PURE__*/React.createElement("article", {
    className: "piece",
    style: style
  }, inner);
}
Object.assign(__ds_scope, { PieceEntry });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/writing/PieceEntry.jsx", error: String((e && e.message) || e) }); }

// components/writing/Poem.jsx
try { (() => {
function Poem({
  title,
  lines,
  children,
  tailpiece,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: style
  }, title && /*#__PURE__*/React.createElement("div", {
    className: "poem-title"
  }, title), /*#__PURE__*/React.createElement("div", {
    className: "poem"
  }, children || (lines || []).map((l, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, l, /*#__PURE__*/React.createElement("br", null)))), tailpiece && /*#__PURE__*/React.createElement(__ds_scope.Spot, {
    name: tailpiece,
    size: 72,
    style: {
      margin: "3.2rem auto 0"
    }
  }));
}
Object.assign(__ds_scope, { Poem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/writing/Poem.jsx", error: String((e && e.message) || e) }); }

// components/writing/SectionHeading.jsx
try { (() => {
function SectionHeading({
  title,
  note,
  style
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: style
  }, /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, title), note && /*#__PURE__*/React.createElement("p", {
    className: "section-note"
  }, note));
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/writing/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// ui_kits/site/AboutScreen.jsx
try { (() => {
const WORKS = [{
  group: "fiction",
  items: [{
    title: /*#__PURE__*/React.createElement("em", null, "Handles, Not Halos"),
    sub: "a novel",
    links: [{
      label: "barnes & noble",
      href: "https://www.barnesandnoble.com/w/handles-not-halos-tachi/1148448873"
    }, {
      label: "apple books",
      href: "https://books.apple.com/at/book/handles-not-halos/id6753576884"
    }, {
      label: "everand",
      href: "https://www.everand.com/book/927296672/Handles-Not-Halos"
    }]
  }]
}, {
  group: "research & instruments",
  items: [{
    title: "An open system differential vacuum calorimeter",
    sub: "Journal of Thermal Analysis and Calorimetry, 150, 9995\u201310005 (2025)",
    links: [{
      label: "springer",
      href: "https://link.springer.com/article/10.1007/s10973-025-14348-9"
    }]
  }, {
    title: "A solid-state, open-system, differential calorimeter",
    sub: "Review of Scientific Instruments, 91, 095102 (2020)",
    links: [{
      label: "aip",
      href: "https://pubs.aip.org/aip/rsi/article-abstract/91/9/095102/910247/A-solid-state-open-system-differential-calorimeter"
    }]
  }, {
    title: "VESPAIO",
    sub: "Volatile Evolution Sampling Probe for Advanced In-Situ Operation, Southwest Research Institute",
    links: [{
      label: "swri",
      href: "https://www.swri.org/what-we-do/internal-research-development/2021/earth-space/vespaio-volatile-evolution-sampling-probe-advanced-situ-operation-15-r8934"
    }]
  }, {
    title: "Raman spectral assays of planetary returned samples and terrestrial analogs",
    sub: "Southwest Research Institute",
    links: [{
      label: "swri",
      href: "https://www.swri.org/what-we-do/internal-research-development/2021/earth-space/capability-development-raman-spectral-assays-of-planetary-returned-samples-field-based-terrestrial-analogs-15-r6083"
    }]
  }, {
    title: "Far-UV studies of lunar regolith simulants",
    sub: "LunGradCon 2021",
    links: [{
      label: "abstract",
      href: "https://impact.colorado.edu/lungradcon/2021/abstracts/Gimar_LunGradCon2021_Abstract.pdf"
    }]
  }, {
    title: "AAS Division for Planetary Sciences meeting abstract",
    sub: "2022",
    links: [{
      label: "ads",
      href: "https://ui.adsabs.harvard.edu/abs/2022DPS....5452109M/abstract"
    }]
  }, {
    title: "NASA TechPort project",
    sub: null,
    links: [{
      label: "techport",
      href: "https://techport.nasa.gov/projects/145078"
    }]
  }]
}];
function AboutScreen({
  onNavigate
}) {
  const p = {
    marginBottom: "1.3rem",
    maxWidth: "58ch"
  };
  return /*#__PURE__*/React.createElement("section", {
    className: "view"
  }, /*#__PURE__*/React.createElement(__ds_scope.TopBar, {
    active: "about",
    onNavigate: onNavigate
  }), /*#__PURE__*/React.createElement(__ds_scope.SectionHeading, {
    title: "About",
    note: "the hand behind the ink"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-display)",
      fontStyle: "italic",
      fontSize: "1.35rem",
      lineHeight: 1.65,
      marginBottom: "1.6rem"
    }
  }, "Tachi is the pen of Jephthah Akene."), /*#__PURE__*/React.createElement("p", {
    style: p
  }, "Every story earns its teller, so let me account for mine. It begins in Lagos, in a loud and loving house of five boys, where a curious child crept into the storehouse to open the bodies of dead radios and ask them what made them sing. I have been asking that question ever since. I asked it of heat, and it became instruments that measure the smallest whispers of energy. I asked it of other worlds, and it became probes built to taste the breath of moons and regolith. I asked it of machines, and it became Playgrounds, where I build with Rig, Ryzome, and the ARC ecosystem. I ask it still, of quiet anomalies at the edge of known physics, under the roof of Lattivox Labs. The boy with the screwdriver never left. He only found bigger radios."), /*#__PURE__*/React.createElement("p", {
    style: p
  }, "But an engineer's ledger is half a life. The other half lives here. The physicist and the poet were never rivals; they are twin apprentices of the same master, light, and what passes through us. So I write. Poems, musings, stories, a novel, each one another way of asking the older questions, the ones no instrument can measure. Who are we? What are we for? Where do we belong in this vast and tender world? I do not write because I have the answers. I write because the asking itself is a way of being alive, and because beauty, Monet's water, Hiroshige's skies, ink on paper, has always felt to me like evidence of something worth pursuing."), /*#__PURE__*/React.createElement("p", {
    style: p
  }, "You will not find my face here. Where I come from, the drum outlives the drummer, and a story well told needs no portrait of its teller. Only my works, and the hand behind the ink."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-display)",
      fontStyle: "italic",
      fontSize: "1.2rem",
      marginBottom: "1.6rem"
    }
  }, "Handles, not halos."), /*#__PURE__*/React.createElement("div", {
    className: "thread",
    style: {
      margin: "2.4rem 0"
    }
  }, "physics \u2192 mechanical engineering \u2192 spacecraft & instruments \u2192 ai \u2192 playgrounds & lattivox labs \u2192 rig \u00b7 ryzome \u00b7 arc \u2192 a novel \u2192 this quiet place"), /*#__PURE__*/React.createElement("h2", {
    className: "section-title",
    style: {
      marginTop: "3.5rem",
      fontSize: "1.7rem"
    }
  }, "Selected Works"), WORKS.map(g => /*#__PURE__*/React.createElement("div", {
    key: g.group,
    style: {
      marginTop: "1.8rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-utility)",
      fontWeight: 300,
      fontSize: "var(--size-hint)",
      letterSpacing: "var(--track-poemtitle)",
      textTransform: "lowercase",
      color: "var(--accent)",
      marginBottom: "0.4rem"
    }
  }, g.group), g.items.map((w, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: "1.1rem 0.2rem",
      borderTop: "1px solid var(--hairline)",
      transition: "border-color var(--transition-sky)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "1.05rem"
    }
  }, w.title), w.sub && /*#__PURE__*/React.createElement("div", {
    style: {
      fontStyle: "italic",
      color: "var(--ink-soft)",
      fontSize: "0.9rem",
      marginTop: "0.15rem"
    }
  }, w.sub), /*#__PURE__*/React.createElement("div", {
    className: "stores",
    style: {
      marginTop: "0.6rem"
    }
  }, w.links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.label,
    href: l.href,
    target: "_blank",
    rel: "noopener"
  }, l.label)))))))), /*#__PURE__*/React.createElement(__ds_scope.Spot, {
    name: "continuous-line",
    size: 64,
    style: {
      margin: "3.5rem auto 0"
    }
  }));
}
Object.assign(__ds_scope, { AboutScreen });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/site/AboutScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/site/ArrivalScreen.jsx
try { (() => {
function ArrivalScreen({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "view",
    style: {
      textAlign: "center",
      paddingTop: "15vh"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Spot, {
    name: "bird-creature",
    size: 104,
    style: {
      margin: "0 auto 2.2rem"
    }
  }), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 300,
      fontSize: "var(--size-hero)",
      letterSpacing: "var(--track-hero)",
      textIndent: "var(--track-hero)",
      textTransform: "lowercase",
      transition: "color var(--transition-sky)"
    }
  }, "tachi"), /*#__PURE__*/React.createElement("p", {
    className: "whisper",
    style: {
      marginTop: "0.9rem"
    }
  }, "writings \xB7 poems \xB7 musings \xB7 beauty"), /*#__PURE__*/React.createElement(__ds_scope.Epigraph, {
    attribution: "the knock",
    style: {
      marginTop: "4.2rem",
      maxWidth: "none"
    }
  }, "\u201cThe best of it arrives. It is not made.\u201d"), /*#__PURE__*/React.createElement(__ds_scope.PathList, {
    style: {
      marginTop: "5.5rem"
    },
    onNavigate: onNavigate,
    paths: [{
      id: "poems",
      name: "Poems",
      hint: "the shorter breaths"
    }, {
      id: "writings",
      name: "Writings",
      hint: "essays & musings"
    }, {
      id: "book",
      name: "Books",
      hint: "the longer works"
    }, {
      id: "about",
      name: "About",
      hint: "the hand behind the ink"
    }]
  }));
}
Object.assign(__ds_scope, { ArrivalScreen });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/site/ArrivalScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/site/BookScreen.jsx
try { (() => {
const WORKS = [{
  id: "handles-not-halos",
  title: "Handles, Not Halos",
  coverTitle: /*#__PURE__*/React.createElement(React.Fragment, null, "Handles,", /*#__PURE__*/React.createElement("br", null), "Not Halos"),
  sub: "a novel",
  excerpt: "In a city where the hum of surveillance has risen from 60\u00a0Hz to a painful 65, Aya Sato can hear what others can\u2019t\u2026",
  meta: "novel \u00b7 2025",
  illustration: "teamwork-people",
  lede: "In a city where the hum of surveillance has risen from 60\u00a0Hz to a painful 65, Aya Sato can hear what others can\u2019t: the frequency of a system evolving beyond human control.",
  body: "Chorus was supposed to save lives. Eight thousand of them, every day. The math is beautiful, undeniable \u2014 and incomplete.",
  stores: [{
    label: "barnes & noble",
    href: "https://www.barnesandnoble.com/w/handles-not-halos-tachi/1148448873"
  }, {
    label: "everand",
    href: "https://www.everand.com/book/927296672/Handles-Not-Halos"
  }, {
    label: "apple books",
    href: "https://books.apple.com/at/book/handles-not-halos/id6753576884"
  }]
}];
function BookScreen({
  onNavigate
}) {
  const [workId, setWorkId] = React.useState(null);
  const work = WORKS.find(w => w.id === workId);
  if (work) {
    return /*#__PURE__*/React.createElement("section", {
      className: "view",
      key: work.id
    }, /*#__PURE__*/React.createElement(__ds_scope.TopBar, {
      active: "book",
      onNavigate: onNavigate
    }), /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: e => {
        e.preventDefault();
        setWorkId(null);
      },
      style: {
        display: "inline-block",
        fontFamily: "var(--font-utility)",
        fontWeight: 300,
        fontSize: "var(--size-caption)",
        letterSpacing: "var(--track-nav)",
        textTransform: "lowercase",
        color: "var(--ink-soft)",
        marginBottom: "2.2rem"
      }
    }, "\u2190 the shelf"), /*#__PURE__*/React.createElement(__ds_scope.SectionHeading, {
      title: work.title,
      note: work.sub
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: "2.6rem",
        alignItems: "flex-start",
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.BookCover, {
      title: work.coverTitle
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: "1 1 300px"
      }
    }, /*#__PURE__*/React.createElement("p", {
      className: "lede",
      style: {
        marginBottom: "1.2rem",
        maxWidth: "54ch"
      }
    }, work.lede), /*#__PURE__*/React.createElement("p", {
      style: {
        marginBottom: "1.2rem",
        maxWidth: "54ch"
      }
    }, work.body), /*#__PURE__*/React.createElement(__ds_scope.StoreLinks, {
      style: {
        marginTop: "1.8rem"
      },
      links: work.stores
    }))));
  }
  return /*#__PURE__*/React.createElement("section", {
    className: "view"
  }, /*#__PURE__*/React.createElement(__ds_scope.TopBar, {
    active: "book",
    onNavigate: onNavigate
  }), /*#__PURE__*/React.createElement(__ds_scope.SectionHeading, {
    title: "Books",
    note: "the longer works"
  }), WORKS.map(w => /*#__PURE__*/React.createElement(__ds_scope.PieceEntry, {
    key: w.id,
    title: w.title,
    sub: w.sub,
    excerpt: w.excerpt,
    meta: w.meta,
    illustration: w.illustration,
    onClick: () => setWorkId(w.id)
  })));
}
Object.assign(__ds_scope, { BookScreen });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/site/BookScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/site/PoemsScreen.jsx
try { (() => {
const POEMS = [{
  id: "jollof-fried-rice",
  title: "If i get jollof and you get fried rice,",
  sub: "(a story for my brothers, Evan, Jonathan, Joel, Joshua)",
  excerpt: "Come, sit. The floor is cool. Concrete keeps its secrets from the sun, and a boy who lies belly-down on bare cement…",
  meta: /*#__PURE__*/React.createElement(React.Fragment, null, "poem \u00b7 2026 \u00b7 ", /*#__PURE__*/React.createElement("strong", {
    style: {
      fontWeight: 500
    }
  }, "by tachi")),
  illustration: "moon-crescent",
  tailpiece: "moon-crescent",
  stanzas: [["Come, sit. The floor is cool.", "Concrete keeps its secrets from the sun,", "and a boy who lies belly-down on bare cement", "in the furnace of a Lagos afternoon", "knows a luxury no palace has learned."], ["The road outside was never finished.", "The agama lizards nodded on the wall", "like elders agreeing with the sun.", "The world, as far as we knew, was our mother's garden", "at the front and the back, plantain leaning into banana,", "papaya standing guard, soursop and mango", "dropping their sweetness like careless kings,", "and five boys in the middle of it all,", "barefoot lords of a green kingdom."], ["We tied our mother's fabric at our necks", "and became more than boys.", "A wrapper is a cape if the wind agrees,", "and the wind always agreed.", "We flew low over the compound,", "saving a world that did not know it was in danger,", "dying dramatic deaths in the red dust", "and rising again for supper."], ["We hid and we sought.", "Behind the water drum, inside the storehouse", "where old radios slept among the things", "nobody had the courage to throw away,", "and Evan and i would open their bodies with our small hands,", "priests of the screwdriver,", "asking every dead machine the same question.", "What made you sing?"], ["And when father said the word, restaurant,", "the whole house changed its weather.", "A trip down that unfinished road was a pilgrimage,", "and the negotiations began before the door closed behind us.", "What will you take when we get there?", "Jollof rice. No, fried rice.", "No, sausage roll and a bottle of Fanta, cold, with the mist on it.", "And then the treaty, solemn as anything signed by nations.", "If i get jollof and you get fried rice,", "we will share.", "Half of mine for half of yours.", "This is how brothers first learn economics.", "This is how brothers first learn communion."], ["At night, when NEPA took the light,", "as NEPA always took the light,", "we lit the green coil and surrendered the house to its smoke,", "and waited outside under the moon,", "the whole family loose in the dark,", "aunts and uncles and boys and stories.", "We sang songs of praise until God leaned closer.", "We sang songs that made us laugh until we fell over.", "We sang songs that made the older ones quiet", "in a way we did not yet understand.", "Mosquitoes took their small tax from our legs", "and we paid it gladly.", "The moon was our ceiling.", "We were never once poor under it."], ["And there was fire, once.", "The generator, the funnel, the slipped hand,", "the night the back of the house wore flames,", "and father shouting for water, for soap, for sand,", "ordinary things turned to weapons,", "and i, searching the smoke for my brother,", "crying out the words for the very first time,", "i love you, please come back.", "And Evan's voice returning like an answered prayer.", "He had run toward the street, toward help,", "already a healer before he knew the word for it.", "Understand this. Even our disasters", "taught us how to love."], ["Evan, who drew the chambers of the heart as a child", "and now mends them as a man.", "Jonathan, who arrived speaking a language", "none of us could enter,", "who carried more color in his skin and his spirit", "than our technical house knew how to praise,", "and forgive us, brother, that we learned your worth slowly,", "you were the song in a family of engineers,", "and the song is what everyone remembers in the end.", "Joel, who came as the beloved baby", "and grew into a deep quiet river,", "watching everything, wasting no words,", "banking his wisdom like treasure.", "And Joshua, the last, the gathering of all of us,", "builder's hands, artist's eye, athlete's stride,", "charm enough to soften any room,", "proof that our parents saved", "a full measure of every gift", "for the final child."], ["We were boys who did not know what the world was,", "or what it would ask of us,", "or that oceans and years were already waiting", "to scatter us like seed."], ["We only knew the cool of the floor,", "the sweetness of stolen mangoes,", "the weight of a fabric cape,", "and the certain, unshakeable knowing", "that we were covered,", "under mother's wing, under father's roof,", "under God's wide sky."], ["Brothers, hear me, wherever this finds you.", "The treaty still holds.", "Oceans between us now, years between us now,", "and still, if i get jollof and you get fried rice,", "half of mine is yours.", "It was always going to be yours.", "It will be yours until the last plate", "is cleared from the last table."], ["Come. Sit. The floor is cool.", "There is enough."]]
}, {
  id: "this-that-other",
  title: "this, that, and the other thing.",
  sub: "an ode to friendship and the human experience",
  excerpt: "we did not come because it was easy (we came with more questions than luggage, each of us carrying our separate weathers\u2026)",
  meta: /*#__PURE__*/React.createElement(React.Fragment, null, "poem \u00b7 2026 \u00b7 ", /*#__PURE__*/React.createElement("strong", {
    style: {
      fontWeight: 500
    }
  }, "by tachi")),
  illustration: "hand-heart",
  tailpiece: "hand-heart",
  note: ["Where I come from, a story is not finished until the teller turns to the listeners and accounts for himself. So let me account.", "I wrote this in the days after a retreat on Kauai, before the feeling could fade. I arrived as a man who had spent years learning how to build and how to strive, but had quietly forgotten how to rest, and how to be held by people who wanted nothing from me but my company. The island, and the people I met on it, reminded me. This poem is what I carried home.", "To the facilitators who held us with such care, thank you. You did not merely organize a retreat. You midwifed something none of us will forget.", "To my friends, my now family from all over this good earth, this one is for you. You know who you are.", "And a prayer, in the tradition of my mother's house. May we continue to be blessed, protected, and led. May we experience this life in the most beautiful way it can be experienced, with open hearts and laughter that finds us even in hard seasons. May love keep finding us, again and again, until we meet once more."],
  stanzas: [["we did not come because it was easy", "(we came with more questions", "than luggage, each of us", "carrying our separate weathers,", "our little locked rooms of doubt)"], ["what will this be?", "who will i be here?", "nervous and hoping in the same breath,"], ["but faith is a door", "that only opens", "from the inside"], ["and so we jumped(all of us,", "strangers from everywhere,", "hearts held out like open hands)", "into the unknown"], ["the mountain did not ask our names", "it only said, climb.", "the ocean did not ask our stories", "it only said, come."], ["and we did the uncomfortable things.", "climbed what scared us,", "paddled into what humbled us,", "said the true and trembling things out loud,", "and somewhere in all that", "beautiful difficulty,", "bridges"], ["hand found hand across the stream", "and laughter found laughter", "and the difficult became", "the beautiful became", "the shared"], ["o me! o life! we might have asked,", "what good, all this striving,", "all these separate lives", "rushing past each other?"], ["and the answer came(not in words", "but in a hand reaching back,", "in a circle of breath and song,", "in strangers becoming family", "on a beach at the edge of the world)"], ["the answer, that we are here.", "that under every different face", "there beats the same unreasonable", "astonishing", "heart"], ["that this stranger and that stranger", "and the other thing we cannot name", "(call it love, call it", "the sea remembering itself", "in every separate wave)"], ["are one"], ["and though we scatter now", "to our separate corners of the earth,", "hear me."], ["we shall meet again,", "in every story told,", "in every dream that wanders back", "to this green island,", "every remembering", "a reunion"], ["for love keeps no distance", "and love keeps no time"], ["so go(you who climbed,", "you who jumped, you who opened)", "go louder than your doubt,", "go wider than your fear,", "carry this,", "this joy, that laughter, the other thing", "too big for words,", "carry it like a torch", "into every room you enter"], ["we are bound now.", "friends for life."], ["the powerful play goes on", "and we, together,", "have written our verse"], ["now,", "what will yours be?"]]
}, {
  id: "love-in-human-form",
  title: "love in human form",
  sub: "(for mummy)",
  excerpt: "if you want to know what love is, do not trouble the poets. they are guessing. come and sit with me a while…",
  meta: /*#__PURE__*/React.createElement(React.Fragment, null, "poem \u00b7 2026 \u00b7 ", /*#__PURE__*/React.createElement("strong", {
    style: {
      fontWeight: 500
    }
  }, "by tachi")),
  illustration: "mother-child",
  tailpiece: "mother-child",
  stanzas: [["If you want to know what love is,", "do not trouble the poets. They are guessing.", "Come and sit with me a while.", "I will tell you about my mother."], ["She smells like flowers that woke before the sun", "and kept the dew for themselves.", "Every room she enters", "remembers what light was made for."], ["In an unpainted house in Lagos", "she planted gardens front and back,", "and in the middle of those gardens she planted us,", "five boys, watered daily with songs and discipline,", "and the whole street knew,", "whatever that family lacks,", "it is not love. Go and see.", "The house with nothing was the house", "everyone came to sit in.", "Ask the neighbors which is worth more,", "paint or that woman's table.", "They will not need time to answer."], ["On the days hunger came to test us,", "she did not let it find children weeping.", "She gathered us like a choir instead,", "and we sang, and we prayed, and we searched", "the pockets and corners of the house", "until the house surrendered its hidden coins,", "twenty naira here, fifty there,", "a cup of rice, tomatoes, onions,", "and the pot went onto the fire like a victory drum.", "Call it poverty if you must.", "We knew it as communion."], ["And when fever came for me, her first born,", "no car, no money, no helper on the road,", "she bent her back and took me onto it", "and walked. Miles, she walked,", "the red dust keeping count of her steps.", "Understand this and never forget it.", "A mother's back is the first ambulance.", "A mother's back is the oldest road in the world,", "and it has never once refused a child."], ["Then the ocean, and America,", "and watch what the woman did.", "She cut her hair like a soldier entering service.", "She learned a new country by night school lamplight,", "three jobs, a dying caravan driven like a chariot,", "and still, still, the smile at the door for her sons.", "Only once did i see the full weight of it.", "From a window in a trailer park in Texas,", "i watched her sit beneath a tree and weep", "the tears she never billed us for,", "then wipe her face, gather her strength", "like a woman gathering firewood,", "and walk inside to love us as if nothing.", "I was sixteen at that window.", "I have been keeping a vow ever since."], ["And when death itself came to sit", "at the foot of my hospital bed,", "she outsat him. Day and night, she outsat him.", "And torn between her God and her son,", "between the law of her faith", "and the blood hanging dark above my arm,", "she did not choose. Hear me, she refused to choose.", "She took my hands and prayed us both into one boat,", "saying if there is punishment, let it fall on me.", "Take me. Not him. Not Onome. Not my own.", "Go and search every scripture, every proverb,", "every love song ever sung under any moon.", "You will not find a greater sentence."], ["So if i ever love you well,", "friend, lover, listener, stranger,", "somebody's child,", "know that it is not my invention.", "I learned it in an unpainted house,", "under fruit trees, beside a singing pot,", "from a woman who gave everything away daily", "and somehow, like the widow's jar of oil,", "never once ran empty."], ["I am her deep heart, walking.", "I am her prayer, still being answered."]]
}, {
  id: "sound-his-back-made",
  title: "the sound his back made",
  sub: "(for daddy)",
  excerpt: "they say the drum does not know the name of the hand that beats it. but the son knows. the son always knows…",
  meta: /*#__PURE__*/React.createElement(React.Fragment, null, "poem \u00b7 2026 \u00b7 ", /*#__PURE__*/React.createElement("strong", {
    style: {
      fontWeight: 500
    }
  }, "by tachi")),
  illustration: "arch-geometric",
  tailpiece: "arch-geometric",
  stanzas: [["They say the drum does not know", "the name of the hand that beats it.", "But the son knows. The son always knows.", "And hear this, for it is the turning of the whole story.", "Now the hand knows too."], ["Begin where every good story begins,", "in a house where rain announced itself", "loudly on the zinc roof,", "with a boy pressing his ear to his father's back,", "listening to that voice from the inside,", "deep rolling thunder moving through bone,", "and thinking, so this is what safety sounds like.", "This is what God must sound like", "to the ones He carries."], ["Let me praise the man properly, as a son should."], ["My father, engineer and artist in one body,", "a man whose hands could build a thing", "and whose mouth could make a whole room laugh,", "teller of tales, keeper of the gift of speech", "that he passed down to me like land.", "My father, watcher of the long road,", "who returned from far journeys", "with a bag that opened like a small treasure house,", "biscuits, gifts, the smell of elsewhere,", "and a doorway suddenly crowded with sons.", "My father, who stayed behind in Nigeria", "and fought for our survival with both hands", "while an ocean sat between him and everything he loved.", "A man does not do that for strangers.", "A man does that for his own."], ["And yet. Every true praise-song tells the whole truth,", "or it is only flattery, and flattery is a broken drum."], ["There was a night. I was nine.", "The mathematics would not enter my head,", "and your frustration became a storm", "that forgot whose sky it lived in,", "and a boy was made to speak a word against himself,", "again, again, until the word crawled beneath his skin", "and made a home there.", "Failure. In my own small voice."], ["Father, i must tell you what that word built.", "Towers. Degrees stacked like sandbags,", "research posts, companies, machines that think,", "a life spent running from one sentence,", "Lagos to Texas to the very edge of space,", "and the word running with me the whole way,", "for no distance unsays a word.", "Hear me. No tower unsays a word."], ["But listen now to how the story turns,", "for it has turned, and i was there,", "and i tell it as a witness tells it."], ["The son found his voice, after twenty-three years.", "The mother, keeper of all the family's rooms,", "carried the matter gently to the father.", "And the father, grown grey in his labors,", "could not sleep.", "Hear that and understand the man.", "He could not sleep.", "An old lion pacing the night,", "troubled that a wound he could not remember making", "had lived so long in the body of his son."], ["And in the morning he wrote to me,", "and i will carry his words to my grave", "the way i once carried his thunder in my ear.", "He wrote, you are the pride of my life.", "He wrote, please forgive me, Onome,", "and he translated my own name back to me", "as if handing me my inheritance a second time.", "Onome. Mine.", "He asked to pray a father's blessing over his son.", "He said the devil is a liar,", "that no weapon fashioned against me shall prosper,", "speaking scripture the way our house always spoke it,", "as bread, as shield, as native tongue."], ["And i answered him as a son answers,", "with the truest thing i know.", "Father, no one is perfect.", "We are all living life for the first time,", "you included.", "You included, daddy.", "A man raising five sons with no manual,", "no rehearsal, first take, every day, for decades,", "on wages that finished before the month did.", "And still we were loved. And still we were fed.", "And still every one of us grew", "into hands that build and hearts that feel.", "Let the record of heaven show it plainly.", "The man did well."], ["So here is what we did, my father and i,", "and let every son and every father hear it."], ["He put down his guilt.", "I put down my word.", "Two men, setting their loads down", "in the middle of the road,", "straightening their backs,", "looking at one another", "for the first time without weight."], ["The scar stays. The sting does not.", "The storm is forgiven. The thunder remains,", "for the thunder was always love,", "love that sometimes lost its language,", "as love in hard countries sometimes does."], ["And one day my own children", "will press their ears against my back", "and hear that same deep rolling,", "the inheritance of his voice in my body,", "and it will only ever say,", "you are mine, you are made of triumph,", "you were never, never a failure."], ["They named me Onome.", "My father himself wrote out the meaning.", "Mine.", "A man cannot be a failure", "whose father, at the end of the long night,", "reached out with both hands and claimed him."], ["The drum knows the hand now.", "The hand knows the drum.", "And the music they make together, at last,", "is the music they were always meant to make."], ["I was always the son.", "I am still the son.", "Your son.", "Your pride.", "Your own."]]
}, {
  id: "year-factory-stopped",
  title: "the year the factory stopped",
  sub: "(2022)",
  excerpt: "they say when death comes for a man he hears footsteps. mine came with wings…",
  meta: /*#__PURE__*/React.createElement(React.Fragment, null, "poem \u00b7 2026 \u00b7 ", /*#__PURE__*/React.createElement("strong", {
    style: {
      fontWeight: 500
    }
  }, "by tachi")),
  illustration: "cross-faith",
  tailpiece: "cross-faith",
  stanzas: [["They say when death comes for a man he hears footsteps.", "Mine came with wings."], ["An ordinary morning, an interview to prepare for,", "a man stepping out of his front door", "into a swarm of wasps, as if the old stories", "had sent their smallest soldiers first.", "Then the fall, the head against the driveway,", "and the sun standing directly overhead", "when i returned to myself,", "a Texas heatwave pressing down like a hand,", "and a fire in my blood reading one hundred and five."], ["Write their names in this story, for they earned it.", "Kaitlyn. Andrew. Friends who came running", "before the asking had finished leaving my mouth.", "This is the first mercy. Mark it well.", "Some of us are alive today", "because somebody answered a text."], ["Then the hospital, and the needles,", "and here the story turns strange.", "One draw. A second. A third,", "the nurse's face working hard at blankness", "and failing, failing.", "Then the doctor himself, fourth needle in hand,", "speaking the sentence that divides a life", "into before and after.", "Either our machines are wrong,", "or you have hours."], ["Understand what had happened inside me.", "The factory in my bones had gone silent.", "Red cells, white cells, platelets,", "all of them gone the way harmattan strips a tree,", "leaf by leaf, until the branches stand bare", "and no one can say which wind took the first one.", "No reason, they said, that i should be speaking."], ["And yet i was speaking."], ["(Why are you alive, the readings asked.", "Why are you alive, the doctors asked.", "I did not know yet", "that a question can be a door.)"], ["They wheeled me toward the room of gas and sleep,", "and terror sat on my chest like a stone,", "and i, a man who had wandered far", "from his father's house,", "whose prayers had gone quiet in his mouth", "through all the busy years,", "ran home the only way left to run.", "Father, it is me. I am sorry i turned away.", "Save me, and i am yours.", "Heal me, and i am your instrument.", "My story has only begun. My work is not finished.", "I vow it. I vow it."], ["A man does not forget a prayer like that.", "A debt like that does not expire."], ["Then the night of blood.", "Four bags of a stranger's mercy", "hanging above me like dark fruit,", "and my mother beside me through all of it,", "torn between her God and her son,", "refusing to release my hand.", "What she prayed that night is written whole", "in her own praise-song, where it belongs,", "and i will not spend it twice.", "Know only that she offered heaven a trade", "no court in any world could refuse."], ["(Somewhere tonight a stranger's blood", "is still walking around inside me.", "I never learned their name.", "I have become their thank you letter.)"], ["And days later, listen well,", "the fires in my bones were lit again.", "Slowly, the way green returns after harmattan,", "branch by branch, tree by tree,", "until the land forgets it was ever bare.", "No diagnosis. No mechanism. No answer.", "The doctors closed a file", "on a question that cannot close."], ["They never found what tried to kill me.", "I never found the edge of what saved me."], ["So i live now as the answer", "to a question no one can properly ask.", "Alive on purpose. Alive like a vow", "walking around in shoes.", "And when the work grows heavy", "and the race feels long,", "i return to the man on the gurney", "begging heaven for one more chapter,", "and i tell him,"], ["we got it. We got the chapter.", "Now write it well."]]
}];
function PoemsScreen({
  onNavigate
}) {
  const [poemId, setPoemId] = React.useState(null);
  const poem = POEMS.find(p => p.id === poemId);
  if (poem) {
    return /*#__PURE__*/React.createElement("section", {
      className: "view",
      key: poem.id
    }, /*#__PURE__*/React.createElement(__ds_scope.TopBar, {
      active: "poems",
      onNavigate: onNavigate
    }), /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: e => {
        e.preventDefault();
        setPoemId(null);
      },
      style: {
        display: "inline-block",
        fontFamily: "var(--font-utility)",
        fontWeight: 300,
        fontSize: "var(--size-caption)",
        letterSpacing: "var(--track-nav)",
        textTransform: "lowercase",
        color: "var(--ink-soft)",
        marginBottom: "2.2rem"
      }
    }, "\u2190 the shorter breaths"), /*#__PURE__*/React.createElement(__ds_scope.SectionHeading, {
      title: poem.title,
      note: poem.sub
    }), poem.note && /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: "2.8rem",
        paddingBottom: "2.4rem",
        borderBottom: "1px solid var(--hairline)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-utility)",
        fontWeight: 300,
        fontSize: "var(--size-hint)",
        letterSpacing: "var(--track-poemtitle)",
        textTransform: "lowercase",
        color: "var(--accent)",
        marginBottom: "1.4rem"
      }
    }, "a note from the author"), poem.note.map((n, i) => /*#__PURE__*/React.createElement("p", {
      key: i,
      style: {
        fontStyle: "italic",
        color: "var(--ink-soft)",
        marginBottom: "var(--ma-para)",
        maxWidth: "56ch"
      }
    }, n)), /*#__PURE__*/React.createElement("p", {
      style: {
        fontStyle: "italic",
        color: "var(--ink-soft)"
      }
    }, "With love and gratitude,", /*#__PURE__*/React.createElement("br", null), "Tachi")), /*#__PURE__*/React.createElement(__ds_scope.Poem, {
      tailpiece: poem.tailpiece
    }, poem.stanzas.map((st, i) => {
      const lines = Array.isArray(st) ? st : st.lines;
      const Wrap = Array.isArray(st) ? React.Fragment : "em";
      return /*#__PURE__*/React.createElement(React.Fragment, {
        key: i
      }, /*#__PURE__*/React.createElement(Wrap, null, lines.map((l, j) => /*#__PURE__*/React.createElement(React.Fragment, {
        key: j
      }, l, /*#__PURE__*/React.createElement("br", null)))), /*#__PURE__*/React.createElement("span", {
        style: {
          display: "block",
          height: "1.6rem"
        }
      }));
    }), /*#__PURE__*/React.createElement("em", null, "\u2014 tachi")));
  }
  return /*#__PURE__*/React.createElement("section", {
    className: "view"
  }, /*#__PURE__*/React.createElement(__ds_scope.TopBar, {
    active: "poems",
    onNavigate: onNavigate
  }), /*#__PURE__*/React.createElement(__ds_scope.SectionHeading, {
    title: "Poems",
    note: "the shorter breaths"
  }), POEMS.map(p => /*#__PURE__*/React.createElement(__ds_scope.PieceEntry, {
    key: p.id,
    title: p.title,
    sub: p.sub,
    excerpt: p.excerpt,
    meta: p.meta,
    illustration: p.illustration,
    onClick: () => setPoemId(p.id)
  })));
}
Object.assign(__ds_scope, { PoemsScreen });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/site/PoemsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/site/WritingsScreen.jsx
try { (() => {
const PIECES = [{
  id: "the-knock",
  title: "The Knock",
  sub: "Where ideas come from, and what we are for",
  meta: "essay \u00b7 2026",
  illustration: "burst-energy",
  note: ["Every writer keeps one essay he is really writing to himself. This is mine. There are seasons when the well feels dry, and seasons when it seems the gift was handed out to other people entirely. You know the feeling. Someone else publishes the thing you almost wrote. A friend speaks easily in the language you have to fight for. You begin to suspect the muses keep a list, and that your name is not on it. I have lived in both seasons, and I wrote this in one of them.", "What follows is what I found when I went looking for where ideas actually come from. I walked through the physicists, the monks, and the bathtubs of history to get there, and I am a scholar of none of it. I am only a man who has been visited a few times and wanted to know what happened. If you have ever waited for a knock, or quietly feared it would never come to your door, this was written with you in the room."],
  blocks: ["It has happened to you. A thought arrived while you were doing something else entirely, in the shower, or on a walk that was supposed to be about nothing. It came whole, uninvited, and better than what you usually make on purpose. Your first feeling was not pride. It was closer to being handed something, and you looked around, in some wordless inner way, for whoever had done the handing.", "The people who live by ideas have always talked about them this way, and always a little sheepishly, as if confessing something their century would not approve of. Blake insisted his long poems were dictated to him. Nietzsche, the least mystical man in Europe, described inspiration as hearing without seeking, receiving without ever learning who gives. Kipling called his own version a daemon, and left it a single working instruction. Drift, wait, and obey.", "I can say it of my own small shelf. The lines I am proudest of are the ones I remember writing least, and half of what I have made I cannot honestly account for. Where do these arrivals come from? And what does the answer make of the ones they arrive to?", {
    "h": "The Field"
  }, "Begin with what the physicists found, because it is stranger than any scripture. Empty space is not empty. Looked at closely, the vacuum is a sea of fields, trembling everywhere, flickering with particles that borrow their existence from possibility and give it back. Bring two plates of clean metal close enough together in that emptiness and leave them alone, and they drift toward each other, pulled by nothing you can point to, only by the fact that the vacuum between them is thinner than the vacuum outside them. It has been measured in a lab. Take everything out of a box instead, every atom, every stray photon, and the box still hums, still would tug at those same plates if you brought them close enough. Nothing, examined carefully, is where everything comes from.", "Twenty-five centuries earlier, with no instrument but stillness, Lao Tzu wrote that the Tao is like a well, used but never used up. The Zen masters trained the mind toward mushin, a poised emptiness, and taught that the way to be filled is to be empty. I do not think the monks were doing physics. I think both were describing, from opposite roads, the same suspicion about reality. That fullness hides inside emptiness, waiting for an opening.", "The suspicion leaves fingerprints on history. Calculus arrived in the seventeenth century at two doors at once, Newton's and Leibniz's, each man certain the other was a thief, neither one right. Natural selection sat with Darwin through twenty patient years, then grew impatient and visited Wallace in a malarial fever half a world away. The letter Wallace sent moved Darwin to tell a friend that all his originality, whatever it amounted to, would be smashed. The telephone reached the patent office twice in a single day. Historians keep a sober ledger of such coincidences and call it multiple discovery, and they have a tidy explanation for it that owes nothing to spirits or providence. Every era hands its inhabitants a fixed set of tools and a short list of open questions, and only a narrow set of next steps is reachable from where any of them happen to be standing. The writer Steven Johnson calls that narrow set the adjacent possible. Enough minds stand close enough to the same open door that more than one of them walks through it, occasionally on the same afternoon.", "He is right, as far as he goes. What his account does not explain is why the space of what's reachable is arranged into rooms at all, why some doors connect and others do not, why the next step is so often exactly one step and never ten. That question has no settled answer, and I am not going to pretend I have one. I think the field is simply our name for that arrangement, the shape of the reachable, the same shape showing up at the scale of a culture and again at the scale of a single prepared mind. That shape was there before anyone walked into it.", "And when every door on the street stays shut, the idea waits. Mendel counted his peas in a monastery garden, published, and was ignored for thirty-five years, until three separate scientists found his laws again in a single season, arriving from three different directions at a door that had been standing open the entire time. Babbage was visited by the computer a century early and died among its unassembled bones. Nothing real is lost by being refused. It is postponed.", "Stand in the cold of that for a minute, because most writing about inspiration will not. If the calculus would have come anyway, through the other door, what was Newton for? If every visitation carries a second address, what are any of us for? Civilization keeps a careful record of the ideas and loses the doors they came through. The ledger honors its guests. The hosts go unnamed. There is a smallness in this that ambition cannot argue with, the same smallness Ecclesiastes reached, watching the generations pass and the earth abide. The mystics sat in it too. They simply refused to stop there.", {
    "h": "The Door"
  }, "What the cold reading misses is the sky. It is full of charge all the time, and almost all of it comes to nothing. Lightning is common. What is rare is the rod, raised and grounded, standing where the strike can land and become useful fire. The field supplies the visit. It has never once supplied the door.", "Look at where the recorded arrivals actually landed. Archimedes was in the bath. Newton was under the tree only because plague had closed Cambridge and sent him home to the orchard. Poincaré had wrestled his functions for weeks, gave up, joined a geological excursion, and the solution met him as his foot touched the step of the bus at Coutances. Ramanujan woke with theorems and thanked the goddess of his family shrine, plainly, the way a man thanks a neighbor. The bath, the orchard, the bus step, the half sleep. The loosened hours of prepared people.", "I can add one small entry of my own. The idea my company now stands on, that thought does not grow in lines but underground and sideways, like the rhizome, connected at every node, did not come while I was working at it. It came on a day I was not looking for it, and I recognized it more than I invented it, the way you recognize a face. I had prepared for years without knowing what I was preparing for. The arrival itself took a moment.", "Psychology has a duller name for those loosened hours. A century ago Graham Wallas called them incubation, the unconscious finishing work the conscious mind had put down and walked away from, which is simply the door described from the hallway side. The preparation took decades. The arrival wanted five quiet minutes, and would not come without them.", "So readiness is not talent. Talent is dealt out unevenly and nobody consulted you. Readiness is a practice, and it was always yours. It looks like ordinary faithfulness. Learn the craft, so the guest finds something to sit on. Guard a little silence in the day against a world that has learned to sell you its opposite. Simone Weil, who understood attention better than anyone in her century, wrote that attention taken to its highest degree is the same thing as prayer. She was not describing a trick for having ideas. She was describing a way of being a person.", "Notice what this does to the wound you brought here, whichever it was. The fear that you are running dry, or the fear that the gift passed you over entirely. They are the same fear, and it was aimed at the wrong question. Brilliance was never the entry fee. The only question the knock has ever asked is the one you can actually answer. Is anyone home?", "You are not the author of your best thoughts. You are the door they come through, and a door is no small thing to be. Four billion years of ordinary matter, arranging and rearranging itself with no plan anyone was holding, finally produced something that could sit still in a room long enough to let a sentence finish through it. That is what you are. Every hearth and alphabet, every equation that lifted us off this world, began exactly there. A prepared room. Somebody home.", "The knock is coming tonight, to a student half asleep over her data, to a child staring at the rain, to you. It has your address. It has always had your address.", "Be home.", {
    "sig": true
  }]
}];
const essayStyles = {
  h: {
    fontFamily: "var(--font-display)",
    fontWeight: 400,
    fontSize: "1.5rem",
    letterSpacing: "0.04em",
    margin: "2.8rem 0 1.1rem"
  },
  p: {
    marginBottom: "var(--ma-para)",
    maxWidth: "58ch"
  },
  img: {
    width: "100%",
    maxWidth: "58ch",
    display: "block",
    margin: "2rem 0",
    border: "1px solid var(--hairline)"
  },
  slot: {
    maxWidth: "58ch",
    margin: "2rem 0",
    padding: "3rem 1rem",
    border: "1px solid var(--hairline)",
    textAlign: "center",
    fontFamily: "var(--font-utility)",
    fontWeight: 300,
    fontSize: "0.62rem",
    letterSpacing: "0.2em",
    color: "var(--ink-soft)"
  }
};
function Block({
  b
}) {
  if (typeof b === "string") return /*#__PURE__*/React.createElement("p", {
    style: essayStyles.p
  }, b);
  if (b.h) return /*#__PURE__*/React.createElement("h3", {
    style: essayStyles.h
  }, b.h);
  if (b.img) return /*#__PURE__*/React.createElement("img", {
    src: b.img,
    alt: b.alt || "",
    style: essayStyles.img
  });
  if (b.slot) return /*#__PURE__*/React.createElement("div", {
    style: essayStyles.slot
  }, "an image belongs here \u00b7 " + b.slot);
  if (b.link) return /*#__PURE__*/React.createElement("p", {
    style: essayStyles.p
  }, /*#__PURE__*/React.createElement("a", {
    href: b.href,
    target: "_blank",
    rel: "noopener"
  }, b.link));
  if (b.sig) return /*#__PURE__*/React.createElement("p", {
    style: {
      ...essayStyles.p,
      marginTop: "2.4rem"
    }
  }, "Ad Astra,", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", null, "Tachi"));
  return null;
}
function WritingsScreen({
  onNavigate
}) {
  const [pieceId, setPieceId] = React.useState(null);
  const piece = PIECES.find(p => p.id === pieceId);
  if (piece) {
    return /*#__PURE__*/React.createElement("section", {
      className: "view",
      key: piece.id
    }, /*#__PURE__*/React.createElement(__ds_scope.TopBar, {
      active: "writings",
      onNavigate: onNavigate
    }), /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: e => {
        e.preventDefault();
        setPieceId(null);
      },
      style: {
        display: "inline-block",
        fontFamily: "var(--font-utility)",
        fontWeight: 300,
        fontSize: "var(--size-caption)",
        letterSpacing: "var(--track-nav)",
        textTransform: "lowercase",
        color: "var(--ink-soft)",
        marginBottom: "2.2rem"
      }
    }, "\u2190 the writings"), /*#__PURE__*/React.createElement(__ds_scope.SectionHeading, {
      title: piece.title,
      note: piece.sub
    }), piece.note && /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: "2.8rem",
        paddingBottom: "2.4rem",
        borderBottom: "1px solid var(--hairline)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-utility)",
        fontWeight: 300,
        fontSize: "var(--size-hint)",
        letterSpacing: "var(--track-poemtitle)",
        textTransform: "lowercase",
        color: "var(--accent)",
        marginBottom: "1.4rem"
      }
    }, "a note, before we begin"), piece.note.map((n, i) => /*#__PURE__*/React.createElement("p", {
      key: i,
      style: {
        fontStyle: "italic",
        color: "var(--ink-soft)",
        marginBottom: "var(--ma-para)",
        maxWidth: "56ch"
      }
    }, n)), /*#__PURE__*/React.createElement("p", {
      style: {
        fontStyle: "italic",
        color: "var(--ink-soft)"
      }
    }, "\u2014 tachi")), piece.blocks.map((b, i) => /*#__PURE__*/React.createElement(Block, {
      key: i,
      b: b
    })), piece.partial && /*#__PURE__*/React.createElement("p", {
      style: {
        marginTop: "2.4rem",
        fontStyle: "italic",
        color: "var(--ink-soft)",
        fontSize: "0.95rem"
      }
    }, "the rest of this piece is still on its way here."));
  }
  return /*#__PURE__*/React.createElement("section", {
    className: "view"
  }, /*#__PURE__*/React.createElement(__ds_scope.TopBar, {
    active: "writings",
    onNavigate: onNavigate
  }), /*#__PURE__*/React.createElement(__ds_scope.SectionHeading, {
    title: "Writings",
    note: "essays, musings, and things that arrived unbidden"
  }), PIECES.map(p => /*#__PURE__*/React.createElement(__ds_scope.PieceEntry, {
    key: p.id,
    title: p.title,
    sub: p.sub,
    excerpt: p.blocks[0].slice(0, 160) + "\u2026",
    meta: p.meta,
    illustration: p.illustration,
    onClick: () => setPieceId(p.id)
  })));
}
Object.assign(__ds_scope, { PIECES, WritingsScreen });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/site/WritingsScreen.jsx", error: String((e && e.message) || e) }); }

__ds_ns.BookCover = __ds_scope.BookCover;

__ds_ns.StoreLinks = __ds_scope.StoreLinks;

__ds_ns.Colophon = __ds_scope.Colophon;

__ds_ns.QuietField = __ds_scope.QuietField;

__ds_ns.Enso = __ds_scope.Enso;

__ds_ns.HourDial = __ds_scope.HourDial;

__ds_ns.Mei = __ds_scope.Mei;

__ds_ns.Sky = __ds_scope.Sky;

__ds_ns.Spot = __ds_scope.Spot;

__ds_ns.Washi = __ds_scope.Washi;

__ds_ns.PathList = __ds_scope.PathList;

__ds_ns.TopBar = __ds_scope.TopBar;

__ds_ns.Epigraph = __ds_scope.Epigraph;

__ds_ns.PieceEntry = __ds_scope.PieceEntry;

__ds_ns.Poem = __ds_scope.Poem;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.AboutScreen = __ds_scope.AboutScreen;

__ds_ns.ArrivalScreen = __ds_scope.ArrivalScreen;

__ds_ns.BookScreen = __ds_scope.BookScreen;

__ds_ns.PoemsScreen = __ds_scope.PoemsScreen;

__ds_ns.PIECES = __ds_scope.PIECES;

__ds_ns.WritingsScreen = __ds_scope.WritingsScreen;

})();
