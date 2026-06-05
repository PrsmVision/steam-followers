import type {
  QuartzComponent,
  QuartzComponentProps,
  QuartzComponentConstructor,
} from "@quartz-community/types"

const SteamFollowers: QuartzComponent = (props?: QuartzComponentProps) => {
  if (!props) return null

  return (
    <div class="steam-followers">
      <span class="steam-icon">🎮</span>
      <span id="steam-follower-count">— seguidores</span>
    </div>
  )
}

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
`

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
`

export default (() => SteamFollowers) satisfies QuartzComponentConstructor
