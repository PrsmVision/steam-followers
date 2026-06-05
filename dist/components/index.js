// src/components/SteamFollowers.tsx
import { jsx, jsxs } from "preact/jsx-runtime";
var SteamFollowers = (props) => {
  if (!props) return null;
  return /* @__PURE__ */ jsxs("div", { class: "steam-followers", children: [
    /* @__PURE__ */ jsx("span", { class: "steam-icon", children: "\u{1F3AE}" }),
    /* @__PURE__ */ jsx("span", { id: "steam-follower-count", children: "\u2014 seguidores" })
  ] });
};
SteamFollowers.afterDOMLoaded = `
  function updateSteamCount() {
    const base = window.location.hostname === 'localhost' ? '' : '/PrismaVision'
    fetch(base + '/static/curator-stats.json')
      .then(r => r.json())
      .then(d => {
        const el = document.getElementById('steam-follower-count')
        if (el) el.textContent = d.followers.toLocaleString('pt-BR') + ' seguidores'
      })
      .catch(() => {})
  }

  updateSteamCount()
  document.addEventListener('nav', () => updateSteamCount())
`;
SteamFollowers.css = `
  .steam-followers {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.85rem;
    color: var(--darkgray);
    padding: 0.2rem 0;
  }

  .steam-icon {
    font-size: 1rem;
  }

  #steam-follower-count {
    color: var(--dark);
    font-weight: 600;
  }
`;
var SteamFollowers_default = (() => SteamFollowers);
export {
  SteamFollowers_default as SteamFollowers
};
//# sourceMappingURL=index.js.map