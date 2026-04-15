/**
 * Graphium AI — navbar scroll fix
 * Mintlify injects inline background styles on scroll via JS.
 * A MutationObserver watches for those changes and resets them.
 */
(function () {
  const NAVBAR_BG = '#080D18';

  function lockNavbar(el) {
    if (!el) return;
    // Override any inline style Mintlify sets on scroll
    el.style.setProperty('background-color', NAVBAR_BG, 'important');
    el.style.setProperty('background', NAVBAR_BG, 'important');
    el.style.setProperty('backdrop-filter', 'none', 'important');
    el.style.setProperty('-webkit-backdrop-filter', 'none', 'important');
    el.style.setProperty('box-shadow', 'none', 'important');
    el.style.setProperty('border-bottom', 'none', 'important');
  }

  function attachObserver() {
    const navbar = document.getElementById('navbar') || document.querySelector('header');
    if (!navbar) return;

    lockNavbar(navbar);

    const observer = new MutationObserver(function (mutations) {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' &&
            (mutation.attributeName === 'style' || mutation.attributeName === 'class')) {
          lockNavbar(navbar);
        }
      }
    });

    observer.observe(navbar, { attributes: true, attributeFilter: ['style', 'class'] });
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachObserver);
  } else {
    attachObserver();
  }

  // Also re-attach after client-side navigation (Next.js router)
  if (typeof window !== 'undefined') {
    window.addEventListener('popstate', function () {
      setTimeout(attachObserver, 100);
    });
  }
})();
