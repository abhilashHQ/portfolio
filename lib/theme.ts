export type Theme = "dark" | "light";

export const THEME_KEY = "theme";
export const DEFAULT_THEME: Theme = "dark";

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

// Swaps the theme inside a view transition and grows the new theme out of (x, y) as a feathered circle.
export function revealTheme(x: number, y: number, update: () => void) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (typeof document.startViewTransition !== "function" || reduce) return update();

  const root = document.documentElement;
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)) + 80;
  root.style.setProperty("--reveal-x", `${x}px`);
  root.style.setProperty("--reveal-y", `${y}px`);
  root.style.setProperty("--reveal-feather", "80px");
  root.classList.add("theme-reveal");

  const transition = document.startViewTransition(update);
  transition.ready
    .then(() =>
      root.animate(
        { "--reveal-r": ["0px", `${radius}px`] },
        {
          duration: 900,
          easing: "cubic-bezier(0.32, 0.72, 0, 1)",
          fill: "forwards",
          pseudoElement: "::view-transition-new(root)",
        },
      ),
    )
    .catch(() => {});
  transition.finished.finally(() => root.classList.remove("theme-reveal"));
}

// Runs before first paint so a saved light choice never flashes dark.
export const themeScript = `(function(){try{var d=localStorage.getItem("${THEME_KEY}")!=="light";document.documentElement.classList.toggle("dark",d);document.documentElement.style.colorScheme=d?"dark":"light"}catch(e){}})()`;
