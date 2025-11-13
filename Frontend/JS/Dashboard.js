
// English and Urdu translations for Dashboard
const translationsDashboard = {
  en: {
    welcome: "Welcome to Dashboard",
    subtitle: "Choose an option below",
    chatbot: "Open Chatbot",
    profile: "Home",
    logout: "Logout"
  },
  ur: {
    welcome: "ڈیش بورڈ میں خوش آمدید",
    subtitle: "نیچے سے کوئی آپشن منتخب کریں",
    chatbot: "چیٹ بوٹ کھولیں",
    profile: "ہوم",
    logout: "لاگ آؤٹ"
  }
};

function switchDashboardLanguage(lang) {
  document.getElementById("welcome").innerHTML = translationsDashboard[lang].welcome;
  document.getElementById("subtitle").innerHTML = translationsDashboard[lang].subtitle;
  document.getElementById("chatbot-btn").innerHTML = translationsDashboard[lang].chatbot;
  document.getElementById("Home-btn").innerHTML = translationsDashboard[lang].profile;
  document.getElementById("logout-btn").innerHTML = translationsDashboard[lang].logout;

  if (lang === "ur") {
    document.body.style.fontFamily = "'Noto Nastaliq Urdu', serif";
    document.body.setAttribute("dir", "rtl");
  } else {
    document.body.style.fontFamily = "Arial, sans-serif";
    document.body.setAttribute("dir", "ltr");
  }
}

// Event Listeners
if (document.querySelector(".lang-en")) {
  document.querySelector(".lang-en").addEventListener("click", () => switchDashboardLanguage("en"));
}
if (document.querySelector(".lang-ur")) {
  document.querySelector(".lang-ur").addEventListener("click", () => switchDashboardLanguage("ur"));
}

const savedLang = localStorage.getItem("lang") || "en";
switchLanguage(savedLang);


// Default language
switchDashboardLanguage("en");

