// JS/Language.js
let currentLang = localStorage.getItem("lang") || "en";

// all translations in one place
const translations = {
  en: {
    sidebarTitle: "Healthcare",
    dashboard: "Dashboard",
    notifications: "Notifications",
    reports: "Reports",
    settings: "Settings",
    support: "Support",
    supportTitle: "💬 Support",
    faqTitle: "📘 FAQs",
    liveChatTitle: "💬 Live Chat Support",
    contactTitle: "📩 Contact Support",
    privacyTitle: "🔒 Privacy Policy",
    privacyText: "We ensure your data is kept secure and private. We never share your information without your consent.",
    startChat: "Start Chat",
    sendMsg: "Send",
    sendSupport: "Send Message",
    yourName: "Your Name",
    yourEmail: "Your Email",
    yourMsg: "Your Message",
  },
  ur: {
    sidebarTitle: "ہیلتھ کیئر",
    dashboard: "ڈیش بورڈ",
    notifications: "اطلاعات",
    reports: "رپورٹس",
    settings: "ترتیبات",
    support: "مدد",
    supportTitle: "💬 مدد",
    faqTitle: "📘 عمومی سوالات",
    liveChatTitle: "💬 براہِ راست چیٹ مدد",
    contactTitle: "📩 مدد سے رابطہ",
    privacyTitle: "🔒 رازداری کی پالیسی",
    privacyText: "ہم آپ کے ڈیٹا کو محفوظ اور نجی رکھتے ہیں۔ ہم کبھی بھی آپ کی معلومات آپ کی اجازت کے بغیر شیئر نہیں کرتے۔",
    startChat: "چیٹ شروع کریں",
    sendMsg: "بھیجیں",
    sendSupport: "پیغام بھیجیں",
    yourName: "آپ کا نام",
    yourEmail: "آپ کا ای میل",
    yourMsg: "آپ کا پیغام",
  }
};

// apply translation on the whole UI
function switchLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);

  // Sidebar
  document.getElementById("sidebar-title").innerText = translations[lang].sidebarTitle;
  document.getElementById("menu-dashboard").innerText = translations[lang].dashboard;
  document.getElementById("menu-notifications").innerText = translations[lang].notifications;
  document.getElementById("menu-reports").innerText = translations[lang].reports;
  document.getElementById("menu-settings").innerText = translations[lang].settings;
  document.getElementById("menu-support").innerText = translations[lang].support;

  // Support sidebar content
  document.getElementById("support-title").innerText = translations[lang].supportTitle;
  document.getElementById("faq-title").innerText = translations[lang].faqTitle;
  document.getElementById("live-chat-title").innerText = translations[lang].liveChatTitle;
  document.getElementById("contact-title").innerText = translations[lang].contactTitle;
  document.getElementById("privacy-title").innerText = translations[lang].privacyTitle;
  document.getElementById("privacy-text").innerText = translations[lang].privacyText;

  // Support inputs/buttons
  document.getElementById("start-chat").innerText = translations[lang].startChat;
  document.getElementById("send-msg").innerText = translations[lang].sendMsg;
  document.getElementById("send-support").innerText = translations[lang].sendSupport;

  document.getElementById("support-name").placeholder = translations[lang].yourName;
  document.getElementById("support-email").placeholder = translations[lang].yourEmail;
  document.getElementById("support-message").placeholder = translations[lang].yourMsg;

  // Notify other JS files
  document.dispatchEvent(new CustomEvent("languageChanged", { detail: lang }));
}

// language toggle buttons
document.querySelector(".lang-en").addEventListener("click", () => switchLanguage("en"));
document.querySelector(".lang-ur").addEventListener("click", () => switchLanguage("ur"));
