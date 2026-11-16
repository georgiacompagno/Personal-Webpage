/* Theme behavior: saved choice wins; otherwise the operating system's preference is used. */
(function () {
  const root = document.documentElement;
  const storageKey = 'personal-portfolio-theme';
  let savedTheme = null;

  try {
    savedTheme = localStorage.getItem(storageKey);
  } catch (error) {
    // Storage may be unavailable in private browsing; system preference still works.
  }

  if (savedTheme === 'light' || savedTheme === 'dark') {
    root.dataset.theme = savedTheme;
  }

  function setTheme(theme) {
    root.dataset.theme = theme;
    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;

    const isDark = theme === 'dark';
    toggle.setAttribute('aria-pressed', String(isDark));
    toggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    const label = toggle.querySelector('.theme-label');
    if (label) label.textContent = isDark ? 'Light mode' : 'Dark mode';
  }

  function initialize() {
    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;

    const initialTheme = root.dataset.theme ||
      (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(initialTheme);

    toggle.addEventListener('click', function () {
      const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      setTheme(nextTheme);
      try {
        localStorage.setItem(storageKey, nextTheme);
      } catch (error) {
        // The toggle still works for this visit if storage is unavailable.
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    initialize();
  }
})();
