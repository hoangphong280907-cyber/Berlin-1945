(function () {
  function centerTabInList(list, tab, instant) {
    if (!list || !tab) return;
    const listRect = list.getBoundingClientRect();
    const tabRect = tab.getBoundingClientRect();
    const currentScroll = list.scrollLeft;
    const tabCenterOffset = tabRect.left - listRect.left + currentScroll + tabRect.width / 2;
    const targetScroll = Math.max(0, tabCenterOffset - listRect.width / 2);

    list.scrollTo({
      left: targetScroll,
      behavior: instant ? "auto" : "smooth",
    });
  }

  function syncIndicator(list, tab) {
    if (!list || !tab) return;
    const left = tab.offsetLeft;
    const width = tab.offsetWidth;
    list.style.setProperty("--tab-left", `${left}px`);
    list.style.setProperty("--tab-width", `${width}px`);
  }

  function updateOverflowShadows(wrapper, list) {
    if (!wrapper || !list) return;
    const maxScroll = list.scrollWidth - list.clientWidth;
    const hasOverflow = maxScroll > 2;
    wrapper.classList.toggle("has-overflow-left", hasOverflow && list.scrollLeft > 4);
    wrapper.classList.toggle("has-overflow-right", hasOverflow && list.scrollLeft < maxScroll - 4);
  }

  function initMobileTabs(wrapper) {
    const list = wrapper.querySelector(".m-tabs__list");
    if (!list) return;

    const tabs = Array.from(list.querySelectorAll('[role="tab"]'));
    if (!tabs.length) return;

    function getPanelsForTab(tab) {
      const id = tab.getAttribute("aria-controls");
      if (!id) return null;
      return document.getElementById(id);
    }

    function activateTab(targetTab, options = {}) {
      const { focus = false, instant = false } = options;

      tabs.forEach((tab) => {
        const isSelected = tab === targetTab;
        tab.setAttribute("aria-selected", String(isSelected));
        tab.tabIndex = isSelected ? 0 : -1;

        const panel = getPanelsForTab(tab);
        if (panel) {
          panel.hidden = !isSelected;
        }
      });

      syncIndicator(list, targetTab);
      centerTabInList(list, targetTab, instant);
      updateOverflowShadows(wrapper, list);

      if (focus) {
        targetTab.focus({ preventScroll: true });
      }

      wrapper.dispatchEvent(
        new CustomEvent("mtabs:change", {
          detail: { tab: targetTab, index: tabs.indexOf(targetTab) },
        })
      );
    }

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => activateTab(tab));

      tab.addEventListener("keydown", (e) => {
        const currentIndex = tabs.indexOf(tab);
        let nextIndex = null;

        if (e.key === "ArrowRight") nextIndex = (currentIndex + 1) % tabs.length;
        else if (e.key === "ArrowLeft") nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        else if (e.key === "Home") nextIndex = 0;
        else if (e.key === "End") nextIndex = tabs.length - 1;

        if (nextIndex !== null) {
          e.preventDefault();
          activateTab(tabs[nextIndex], { focus: true });
        }
      });
    });

    list.addEventListener("scroll", () => updateOverflowShadows(wrapper, list), { passive: true });

    const initialTab = tabs.find((t) => t.getAttribute("aria-selected") === "true") || tabs[0];
    activateTab(initialTab, { instant: true });

    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(() => {
        const active = tabs.find((t) => t.getAttribute("aria-selected") === "true") || tabs[0];
        syncIndicator(list, active);
        centerTabInList(list, active, true);
        updateOverflowShadows(wrapper, list);
      });
      ro.observe(list);
      tabs.forEach((t) => ro.observe(t));
    } else {
      window.addEventListener("resize", () => {
        const active = tabs.find((t) => t.getAttribute("aria-selected") === "true") || tabs[0];
        syncIndicator(list, active);
        centerTabInList(list, active, true);
        updateOverflowShadows(wrapper, list);
      });
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".m-tabs").forEach(initMobileTabs);
  });
})();
