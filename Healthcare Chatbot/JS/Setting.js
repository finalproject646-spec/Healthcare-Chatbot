// Elements
const settingsPanel = document.getElementById("settingsPanel");
const settingsOverlay = document.getElementById("settingsOverlay");
const closeSettings = document.getElementById("closeSettings");

// Sidebar button to open (make sure sidebar item has id="settings-btn")
document.getElementById("menu-settings").addEventListener("click", () => {
  settingsPanel.classList.add("open");
  settingsOverlay.classList.add("active");
});

// Close
closeSettings.addEventListener("click", closeSettingsPanel);
settingsOverlay.addEventListener("click", closeSettingsPanel);

function closeSettingsPanel() {
  settingsPanel.classList.remove("open");
  settingsOverlay.classList.remove("active");
}

// --- THEME SWITCH ---
const themeSelect = document.getElementById("themeSelect");
const currentTheme = localStorage.getItem("theme") || "light";
applyTheme(currentTheme);
themeSelect.value = currentTheme;

themeSelect.addEventListener("change", () => {
  const theme = themeSelect.value;
  applyTheme(theme);
  localStorage.setItem("theme", theme);
});

function applyTheme(theme) {
  if (theme === "dark") document.body.classList.add("dark-mode");
  else document.body.classList.remove("dark-mode");
}

// --- LANGUAGE SWITCH ---
const langSelect = document.getElementById("languageSelect");
const currentLang = localStorage.getItem("language") || "en";
langSelect.value = currentLang;
applyLanguage(currentLang);

langSelect.addEventListener("change", () => {
  const lang = langSelect.value;
  localStorage.setItem("language", lang);
  applyLanguage(lang);
});

function applyLanguage(lang) {
  if (lang === "ur") {
    document.body.style.fontFamily = "'Noto Nastaliq Urdu', serif";
    document.body.dir = "rtl";
  } else {
    document.body.style.fontFamily = "Poppins, sans-serif";
    document.body.dir = "ltr";
  }
}

// --- NOTIFICATIONS SWITCH ---
const notifSwitch = document.getElementById("notifSwitch");
notifSwitch.checked = localStorage.getItem("notifications") !== "off";

notifSwitch.addEventListener("change", () => {
  const state = notifSwitch.checked ? "on" : "off";
  localStorage.setItem("notifications", state);
  alert(`Notifications ${state === "on" ? "Enabled" : "Disabled"}`);
});

// --- LOGOUT ---
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "login.html";
});

