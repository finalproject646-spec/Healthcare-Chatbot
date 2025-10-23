const translations = {
  en: {
    servicesTitle: "Healthcare Services",
    welcome: "Welcome to Healthcare Service",
    searchPlaceholder: "🔍 Search by Patient Name or Appointment ID",
    searchBtn: "Search",
    patientsValue: "120",
    appointmentsValue: "5 Upcoming",
    reportsValue: "45 Available",
    patients: "Patients Records",
    appointments: "Appointments",
    reports: "Reports",
    profile: "Profile",
    statPatients: "👨‍⚕️ Patients",
    statAppointments: "📅 Appointments",
    statReports: "📑 Reports",
    back: "⬅ "
  },
  ur: {
    servicesTitle: "ہیلتھ کیئر سروسز",
    welcome: "ہیلتھ کیئر سروس میں خوش آمدید",
    searchPlaceholder: "🔍 مریض کے نام یا ملاقات آئی ڈی سے تلاش کریں",
    searchBtn: "تلاش",
    patientsValue: "۱۲۰",
    appointmentsValue: "۵ آنے والی",
    reportsValue: "۴۵ دستیاب",
    patients: "مریض کا ریکارڈ",
    appointments: "ملاقاتیں",
    reports: "رپورٹس",
    profile: "پروفائل",
    statPatients: "👨‍⚕️ مریض",
    statAppointments: "📅 ملاقاتیں",
    statReports: "📑 رپورٹس",
    back:"⬅"
  }
};

//  Language toggle
document.querySelector(".lang-en").addEventListener("click", () => {
  setLanguage("en");
  localStorage.setItem("lang", "en");
});

document.querySelector(".lang-ur").addEventListener("click", () => {
  setLanguage("ur");
  localStorage.setItem("lang", "ur");
});

function setLanguage(lang) {
  const t = translations[lang];

  document.getElementById("patients-stat-value").innerText = t.patientsValue;
  document.getElementById("appointments-stat-value").innerText = t.appointmentsValue;
  document.getElementById("reports-stat-value").innerText = t.reportsValue;
  document.getElementById("search-input").setAttribute("placeholder", t.searchPlaceholder);
  document.getElementById("search-btn").innerText = t.searchBtn;
  document.getElementById("services-title").innerText = t.servicesTitle;
  document.getElementById("welcome").innerText = t.welcome;
  document.getElementById("nav-patients-label").innerText = t.patients;
  document.getElementById("nav-appointments-label").innerText = t.appointments;
  document.getElementById("nav-reports-label").innerText = t.reports;
  document.getElementById("profile-label").innerText = t.profile;

  document.getElementById("patients-stat-title").innerText = t.statPatients;
  document.getElementById("appointments-stat-title").innerText = t.statAppointments;
  document.getElementById("reports-stat-title").innerText = t.statReports;

  //  Back button translation
  const backBtn = document.getElementById("back-btn");
  if (backBtn) backBtn.innerText = t.back;

  // Font + Direction
  if (lang === "ur") {
    document.body.style.fontFamily = "'Noto Nastaliq Urdu', serif";
    document.body.setAttribute("dir", "rtl");
  } else {
    document.body.style.fontFamily = "Arial, sans-serif";
    document.body.setAttribute("dir", "ltr");
  }
}

//  Load saved language on page load
const savedLang = localStorage.getItem("lang") || "en";
setLanguage(savedLang);

// Dummy Search
document.getElementById("search-btn").addEventListener("click", () => {
  let query = document.getElementById("search-input").value;
  if (query) {
    alert("Searching for: " + query + " (Demo only)");
  } else {
    alert("Please enter something to search.");
  }
});

// Navigation
document.getElementById("nav-patients").addEventListener("click", () => window.location.href = "patients.html");
document.getElementById("nav-appointments").addEventListener("click", () => window.location.href = "appointments.html");
document.getElementById("nav-reports").addEventListener("click", () => window.location.href = "reports.html");

//  Back Button Click (Dashboard)
document.getElementById("back-btn").addEventListener("click", () => {
  window.location.href = "Dashboard.html";
});

if (typeof setSidebarLang === "function") {
  setSidebarLang(lang);
}
