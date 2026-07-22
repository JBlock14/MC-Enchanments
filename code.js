/* DOM */
// Search
const search = document.getElementById("search");
// Sections
const sectionContainer = document.getElementById("sectionContainer");
// Filters
const filterBtn = document.getElementById("filterBtn");
const filterPopup = document.getElementById("filterPopup");
const activeFiltersDiv = document.getElementById("activeFilters");
// Language
const availableLanguages = Object.keys(languages.available);
// Help
const helpOverlay = document.getElementById("helpOverlay");
const helpContent = document.getElementById("helpContent");

/* MODALS */
function setupModal({ overlayId, menuSelector = ".help-menu", closeButtonSelector = ".close-btn", blockScroll = false }) {
  const overlay = document.getElementById(overlayId);
  const menu = overlay.querySelector(menuSelector);
  const closeButton = overlay.querySelector(closeButtonSelector);
  function open() {
    overlay.style.display = "flex";
    if (blockScroll) {
      document.body.classList.add("modal-open");
    }
  }
  function close() {
    overlay.style.display = "none";
    if (blockScroll) {
      document.body.classList.remove("modal-open");
    }
  }
  closeButton.addEventListener("click", close);
  overlay.addEventListener("click", (e) => {
    if (!menu.contains(e.target)) {
      close();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.style.display === "flex") {
      close();
    }
  });
  return { open, close };
}
const dropdowns = [];

function setupDropdown({
    button,
    popup,
    onOpen,
    onClose,
    isOpen,
}) {
    dropdowns.push({
        button,
        popup,
        close: onClose,
    });

    button.addEventListener("click", (e) => {
        e.stopPropagation();

        const opened = isOpen();

        // Cerrar todos los menús
        dropdowns.forEach((dropdown) => {
            dropdown.close();
        });

        // Abrir solo el actual si estaba cerrado
        if (!opened) {
            onOpen();
        }
    });
}
document.addEventListener("click", (e) => {
    dropdowns.forEach((dropdown) => {
        const clickedOutside =
            !dropdown.popup.contains(e.target) &&
            !dropdown.button.contains(e.target);

        if (clickedOutside) {
            dropdown.close();
        }
    });
});

/* FILTERS */
let activeFilters = [];
function closeFilterPopup() {
  filterPopup.style.opacity = "0";
  filterPopup.style.transform =
    "translateX(-50%) translateY(-10px)";

  filterBtn.classList.remove("active");

  setTimeout(() => {
    if (filterPopup.style.opacity === "0") {
      filterPopup.style.display = "none";
    }
  }, 300);
}
setupDropdown({
    button: filterBtn,

    popup: filterPopup,

    isOpen: () => {
        return filterPopup.style.display === "flex";
    },

    onOpen: () => {
        filterPopup.style.display = "flex";

        filterBtn.classList.add("active");

        requestAnimationFrame(() => {
          filterPopup.style.opacity = "1";
          filterPopup.style.transform =
          "translateX(-50%) translateY(0)";
        });
    },

    onClose: closeFilterPopup,
});
// Filter Menu
function createFilterOptions() {
  filterPopup.innerHTML = "";
  Object.entries(groups).forEach(([id, group], index) => {
    const div = document.createElement("div");
    div.className = "filter-option";
    div.dataset.group = id;
    div.innerHTML = `
      <img src="assets/items/${group.file}">
      ${translate(group.key)}
    `;
    div.style.animationDelay = `${index * 0.1}s`;
    div.addEventListener("click", () => {
      const exists = activeFilters.some((f) => f.type === "group" && f.id === id);
      if (!exists) {
        activeFilters.push({
          type: "group",
          id,
        });
        addFilterBubble({
          type: "group",
          id,
        });
      }
      closeFilterPopup();
      applyFilters();
    });
    filterPopup.appendChild(div);
  });
}
// Filter Bubbles
function addFilterBubble(filter) {
  const info = filter.type === "group" ? groups[filter.id] : itemMap[filter.id];
  if (!info) return;
  const bubble = document.createElement("div");
  const name = translate(info.key);
  bubble.className = "filter-bubble";
  bubble.innerHTML = `
    <img src="assets/items/${info.file}" alt="${name}">
  `;
  bubble.title = name;
  bubble.addEventListener("click", () => {
    activeFilters = activeFilters.filter((f) => !(f.type === filter.type && f.id === filter.id));
    bubble.classList.add("removing");
    bubble.addEventListener("animationend", () => {
      bubble.remove();
    });
    applyFilters();
  });
  activeFiltersDiv.appendChild(bubble);
}
// Apply Filters
function applyFilters() {
  const searchText = search.value.trim().toLowerCase();
  const query = removeAccents(
    searchText
      .replace(/:([^:]+):/g, "")
      .replace(/:[^:]*$/, "")
      .trim(),
  );
  const isLevelSearch = /^\d+$/.test(query);
  const levelNumber = Number(query);
  if (query.startsWith("/")) {
    document.querySelectorAll(".result").forEach((section) => {
      section.style.display = "flex";
      section.classList.remove("hidden");
    });
    return;
  }
  const hasItemFilters = activeFilters.some((f) => f.type === "item");
  const hasGroupFilters = activeFilters.some((f) => f.type === "group");
  document.querySelectorAll(".result").forEach((section) => {
    const title = removeAccents(section.dataset.title.toLowerCase());
    const matchTitle = isLevelSearch || query === "" || title.includes(query);
    const matchItem =
      !hasItemFilters || activeFilters.some((f) => f.type === "item" && section.querySelector(`.item[data-key="${f.id}"]`));
    const matchGroup =
      !hasGroupFilters ||
      activeFilters.some(
        (f) => f.type === "group" && groups[f.id].items.some((item) => section.querySelector(`.item[data-key="${item}"]`)),
      );
    const matchLevel = !isLevelSearch || parseInt(section.dataset.level, 10) === levelNumber;
    const visible = matchTitle && matchItem && matchGroup && matchLevel;
    if (visible) {
      section.style.display = "flex";
      requestAnimationFrame(() => {
        section.classList.remove("hidden");
      });
    } else {
      section.classList.add("hidden");
      setTimeout(() => {
        if (section.classList.contains("hidden")) {
          section.style.display = "none";
        }
      }, 250);
    }
    // Opacidad de los ítems
    section.querySelectorAll(".item").forEach((item) => {
      item.classList.remove("inactive");
      const belongsItem = activeFilters.some((f) => f.type === "item" && f.id === item.dataset.key);
      const belongsGroup = activeFilters.some((f) => f.type === "group" && groups[f.id].items.includes(item.dataset.key));
      const active =
        (hasItemFilters && belongsItem) || (hasGroupFilters && belongsGroup) || (!hasItemFilters && !hasGroupFilters);
      if (!active) {
        item.classList.add("inactive");
      }
    });
  });
}
// Search Item Filters
search.addEventListener("input", () => {
  const text = search.value;
  if (text.startsWith("/")) {
    search.classList.add("command-mode");
  } else {
    search.classList.remove("command-mode");
  }
  const slashIndex = text.indexOf("/");
  if (slashIndex > 0) {
    search.value = text.substring(0, slashIndex);
    return;
  }
  if (text === "/help") {
    search.value = "";
    search.classList.remove("command-mode");
    search.blur();
    openHelp();
    return;
  }
  const filters = [...text.matchAll(/:([^:]+):/g)];
  filters.forEach((f) => {
    const fullTag = f[0];
    const name = removeAccents(f[1].toLowerCase().trim());
    let found = false;
    for (const [key, info] of Object.entries(itemMap)) {
      const translatedName = removeAccents(translate(info.key).toLowerCase().trim());
      if (translatedName === name) {
        found = true;
        const exists = activeFilters.some((fl) => fl.type === "item" && fl.id === key);
        if (!exists) {
          activeFilters.push({
            type: "item",
            id: key,
          });
          addFilterBubble({
            type: "item",
            id: key,
          });
        }
        break;
      }
    }
    search.value = search.value.replace(fullTag, "");
  });
  applyFilters();
});

/* SECTIONS */
function renderSections(data) {
  sectionContainer.innerHTML = "";
  data
    .slice()
    .sort((a, b) => {
      let ta = translate(`enchantment.${a.id}`);
      let tb = translate(`enchantment.${b.id}`);
      if (ta.startsWith("*")) ta = ta.substring(1).trim();
      if (tb.startsWith("*")) tb = tb.substring(1).trim();
      return ta.localeCompare(tb, "en", { sensitivity: "base" });
    })
    .forEach((ap) => {
      let title = translate(`enchantment.${ap.id}`);
      let extraClass = "";
      const romanNumbers = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
      const arabicLevel = ap.level || 1;
      const romanLevel = romanNumbers[arabicLevel];
      const levelText = arabicLevel > 1 ? `<span class="roman-level">${romanLevel}</span>` : "";
      // Create Section
      const section = document.createElement("section");
      section.className = "result";
      section.dataset.title = title;
      section.dataset.description = translate(`enchantment.${ap.id}.description`);
      section.dataset.level = arabicLevel;
      // Section Logo
      const logoDiv = document.createElement("div");
      logoDiv.className = "section-logo";
      logoDiv.innerHTML = `<img src="${ap.logo}" alt="">`;
      // Section Content
      const content = document.createElement("div");
      content.className = "section-content";
      if (title.startsWith("*")) {
        title = title.substring(1).trim();
        extraClass = "curse";
      }
      content.innerHTML = `
      <h3 class=${extraClass}>
      ${title} ${levelText}
      </h3>
      <p>${translate(`enchantment.${ap.id}.description`)}</p>
      <div class="items"></div>
      `;
      section.appendChild(logoDiv);
      section.appendChild(content);
      // Items
      const itemsDiv = content.querySelector(".items");
      Object.keys(ap.items).forEach((key) => {
        if (ap.items[key] && itemMap[key]) {
          const info = itemMap[key];
          const itemName = translate(info.key);
          const div = document.createElement("div");
          div.className = "item";
          div.dataset.key = key;
          div.innerHTML = `
            <img src="assets/items/${info.file}" alt="${itemName}">
        `;
          itemsDiv.appendChild(div);
        }
      });
      sectionContainer.appendChild(section);
    });
}

/* ADDITIONAL */
// Sound
const writingSound = new Audio("assets/sounds/text.mp3");
search.addEventListener("input", () => {
  writingSound.currentTime = 0;
  writingSound.play();
});
// Text
function removeAccents(str = "") {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
// Security
document.addEventListener("contextmenu", (e) => {
  if (e.target.tagName === "IMG") {
    e.preventDefault();
  }
});
// MD Format
marked.use({
  renderer: {
    codespan(token) {
      // Si token es objeto, usa token.text; si no, conviértelo a string
      const codeText = typeof token === "object" ? token.text || token.raw || String(token) : String(token);
      return `<code class="copyable">${codeText}</code>`;
    },
  },
});
document.addEventListener("click", async (e) => {
  if (e.target.matches("code.copyable")) {
    const text = e.target.textContent.trim();
    await navigator.clipboard.writeText(text);
    e.target.style.background = "rgba(9, 255, 0, 0.16)";
    setTimeout(() => (e.target.style.background = "rgba(128, 128, 128, 0.32)"), 500);
  }
});

/* LANGUAGE */
const languageButton = document.getElementById("languageButton");
const languagePopup = document.getElementById("languagePopup");
const languageList = document.getElementById("languageList");
const languageSearch = document.getElementById("languageSearch");
const currentLanguageText = document.getElementById("currentLanguage");
let currentLanguage = languages.default;
let translations = {};
/* LANGUAGE SYSTEM */
async function loadLanguage(lang) {
  try {
    // Cargar siempre el idioma por defecto
    const defaultResponse = await fetch(
      `lang/${languages.default}.lang`
    );

    if (!defaultResponse.ok) {
      throw new Error(
        "Default language not found"
      );
    }

    const defaultText =
      await defaultResponse.text();

    const defaultTranslations = {};

    defaultText
      .split("\n")
      .forEach((line) => {
        if (
          !line ||
          line.startsWith("#")
        ) {
          return;
        }

        const [key, ...valueParts] =
          line.split("=");

        if (key && valueParts.length) {
          defaultTranslations[
            key.trim()
          ] = valueParts
            .join("=")
            .trim();
        }
      });

    // Empezar con el idioma por defecto
    translations = {
      ...defaultTranslations,
    };

    // Si no es el idioma por defecto,
    // sobrescribir las claves existentes
    if (lang !== languages.default) {
      const response = await fetch(
        `lang/${lang}.lang`
      );

      if (!response.ok) {
        throw new Error(
          "Language not found"
        );
      }

      const text = await response.text();

      text
        .split("\n")
        .forEach((line) => {
          if (
            !line ||
            line.startsWith("#")
          ) {
            return;
          }

          const [
            key,
            ...valueParts
          ] = line.split("=");

          if (
            key &&
            valueParts.length
          ) {
            translations[
              key.trim()
            ] = valueParts
              .join("=")
              .trim();
          }
        });
    }

    currentLanguage = lang;

    localStorage.setItem(
      "selectedLanguage",
      lang
    );

    updateLanguageName();
    updateInterfaceLanguage();
    renderLanguageList();
    renderSections(sectionData);
    createFilterOptions();
    applyFilters();

  } catch (error) {
    console.error(error);

    if (lang !== languages.default) {
      loadLanguage(
        languages.default
      );
    }
  }
}
function translate(key) {
  return translations[key] || key;
}
function updateLanguageName() {
  document.documentElement.lang = currentLanguage;
  currentLanguageText.textContent = currentLanguage;
}
function updateInterfaceLanguage() {
  search.placeholder = translate("ui.search");
  const filterWrapper = document.querySelector(".filter-wrapper");
  if (filterWrapper) {
    filterWrapper.dataset.name = translate("ui.filters");
  }
  if (languageSearch) {
    languageSearch.placeholder = translate("ui.search");
  }
  const footerText = document.getElementById("footerText");
  if (footerText) {
    const command = "<strong>/help</strong>";
    footerText.innerHTML = translate("ui.footer").replace("/help", command);
  }
  const supportButton = document.getElementById("supportButton");
  if (supportButton) {
    supportButton.textContent = translate("ui.support");
    supportButton.addEventListener("click", () => {
      openHelp();
    });
  }
  const legalText = document.getElementById("legalText");
  if (legalText) {
    legalText.textContent = translate("ui.legal");
  }
}
function renderLanguageList(filter = "") {
  languageList.innerHTML = "";
  const query = removeAccents(filter.toLowerCase());
  availableLanguages.forEach((lang, index) => {
    const name = languages.available[lang].name;
    const normalized = removeAccents(name.toLowerCase());
    if (query && !normalized.includes(query)) {
      return;
    }
    const option = document.createElement("div");
    option.className = "language-option";
    if (lang === currentLanguage) {
      option.classList.add("active");
    }
    option.textContent = name;
    option.style.animationDelay = `${index * 0.05}s`;
    option.addEventListener("click", () => {
      if (lang !== currentLanguage) {
        loadLanguage(lang);
      }
      languagePopup.style.display = "none";
      languageSearch.value = "";
    });
    languageList.appendChild(option);
  });
}
function detectLanguage() {
  const savedLanguage = localStorage.getItem("selectedLanguage");
  if (savedLanguage && availableLanguages.includes(savedLanguage)) {
    loadLanguage(savedLanguage);
    return;
  }
  const browserLanguages = navigator.languages || [navigator.language];
  for (const lang of browserLanguages) {
    const browser = lang.toLowerCase().replace("-", "_");
    if (availableLanguages.includes(browser)) {
      loadLanguage(browser);
      return;
    }
    const base = browser.split("_")[0];
    const match = availableLanguages.find((available) => available.split("_")[0] === base);
    if (match) {
      loadLanguage(match);
      return;
    }
  }
  loadLanguage(languages.default);
}

/* HELP */
const helpModal = setupModal({
  overlayId: "helpOverlay",
  menuSelector: ".help-menu",
  closeButtonSelector: ".close-btn",
  blockScroll: true,
});
async function openHelp() {
  helpModal.open();
  helpContent.innerHTML = "Loading...";
  let response = await fetch(`help_menu/${currentLanguage}.md`);
  if (!response.ok) {
    response = await fetch(`help_menu/${languages.default}.md`);
  }
  const text = await response.text();
  helpContent.innerHTML = marked.parse(text);
}

/* EVENTS */
setupDropdown({
    button: languageButton,

    popup: languagePopup,

    isOpen: () => {
        return languagePopup.style.display === "flex";
    },

    onOpen: () => {
        languagePopup.style.display = "flex";
        languageSearch.focus();
    },

    onClose: () => {
        languagePopup.style.display = "none";
    },
});

// PWA
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register("./sw.js");

      console.log(
        "Service Worker registrado:",
        registration.scope,
      );
    } catch (error) {
      console.error(
        "Error al registrar el Service Worker:",
        error,
      );
    }
  });
}

/* INIT */
detectLanguage();