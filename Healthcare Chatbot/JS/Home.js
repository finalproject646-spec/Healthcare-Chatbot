const translations = {
  en: {
    welcome: "Welcome to Healthcare Service",
    subtitle: "Select an option below to proceed",
    patients: "Patients Records",
    appointments: "Appointments",
    reports: "Reports",
    profile: "Profile",
    statPatients: "👨‍⚕️ Patients",
    statAppointments: "📅 Appointments",
    statReports: "📑 Reports"
  },
  ur: {
    welcome: "ہیلتھ کیئر سروس میں خوش آمدید",
    subtitle: "نیچے سے کوئی آپشن منتخب کریں",
    patients: "مریض کا ریکارڈ",
    appointments: "ملاقاتیں",
    reports: "رپورٹس",
    profile: "پروفائل",
    statPatients: "👨‍⚕️ مریض",
    statAppointments: "📅 ملاقاتیں",
    statReports: "📑 رپورٹس"
  }
};

// Language toggle
document.querySelector(".lang-en").addEventListener("click", () => setLanguage("en"));
document.querySelector(".lang-ur").addEventListener("click", () => setLanguage("ur"));

function setLanguage(lang) {
  const t = translations[lang];

  document.getElementById("welcome").innerText = t.welcome;
  document.getElementById("subtitle").innerText = t.subtitle;
  document.getElementById("nav-patients-label").innerText = t.patients;
  document.getElementById("nav-appointments-label").innerText = t.appointments;
  document.getElementById("nav-reports-label").innerText = t.reports;
  document.getElementById("profile-label").innerText = t.profile;

  document.getElementById("patients-stat-title").innerText = t.statPatients;
  document.getElementById("appointments-stat-title").innerText = t.statAppointments;
  document.getElementById("reports-stat-title").innerText = t.statReports;

  // Font + Direction
  if (lang === "ur") {
    document.body.style.fontFamily = "'Noto Nastaliq Urdu', serif";
    document.body.setAttribute("dir", "rtl");
  } else {
    document.body.style.fontFamily = "Arial, sans-serif";
    document.body.setAttribute("dir", "ltr");
  }
}

// Default language
setLanguage("en");

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
document.getElementById("nav-profile").addEventListener("click", () => window.location.href = "profile.html");
document.getElementById("nav-patients").addEventListener("click", () => window.location.href = "patients.html");
document.getElementById("nav-appointments").addEventListener("click", () => window.location.href = "appointments.html");
document.getElementById("nav-reports").addEventListener("click", () => window.location.href = "reports.html");

const savedLang = localStorage.getItem("lang") || "en";
switchLanguage(savedLang);


// Back button (sirf home page se back jana ke liye)
const backBtn = document.getElementById("back-btn");
if (backBtn) {
  backBtn.addEventListener("click", () => {
    window.location.href = "Dashboard.html";
  });
}
