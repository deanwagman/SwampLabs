(() => {
  "use strict";

  const SITE_CONFIG = Object.freeze({
    appStoreUrl: "REPLACE_WITH_APP_STORE_URL",
  });

  const menuButton = document.querySelector("[data-menu-toggle]");
  const navigation = document.querySelector("[data-navigation]");
  const appStoreLinks = document.querySelectorAll("[data-app-store-link]");
  const toast = document.querySelector("[data-toast]");
  let toastTimer;

  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  function closeMenu() {
    if (!menuButton || !navigation) return;
    menuButton.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  }

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const shouldOpen = menuButton.getAttribute("aria-expanded") !== "true";
      menuButton.setAttribute("aria-expanded", String(shouldOpen));
      navigation.classList.toggle("is-open", shouldOpen);
      document.body.classList.toggle("menu-open", shouldOpen);
    });

    navigation.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  function showPrelaunchMessage(event) {
    event.preventDefault();
    if (!toast) return;

    toast.hidden = false;
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast.hidden = true;
    }, 2800);
  }

  appStoreLinks.forEach((link) => {
    if (SITE_CONFIG.appStoreUrl.startsWith("https://")) {
      link.href = SITE_CONFIG.appStoreUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.removeAttribute("aria-disabled");

      if (link.dataset.liveText) {
        link.textContent = link.dataset.liveText;
      }

      const storeStatus = link.querySelector("[data-store-status]");
      if (storeStatus) storeStatus.textContent = "Download on the";
      return;
    }

    link.setAttribute("aria-disabled", "true");
    link.addEventListener("click", showPrelaunchMessage);
  });
})();
