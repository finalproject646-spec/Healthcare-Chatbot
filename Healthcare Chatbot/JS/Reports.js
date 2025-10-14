// Translations
const translations = {
  en: {
    title: "Reports",
    name: "Name",
    report: "Report",
    date: "Date",
    view: "View",
    download: "Download",
    navProfile: "Profile",
    navPatients: "Patients",
    navAppointments: "Appointments",
    navReports: "Reports",
    modalTitle: "Report Preview"
  },
  ur: {
    title: "رپورٹس",
    name: "نام",
    report: "رپورٹ",
    date: "تاریخ",
    view: "دیکھیں",
    download: "ڈاؤن لوڈ",
    navProfile: "پروفائل",
    navPatients: "مریض",
    navAppointments: "اپوائنٹمنٹس",
    navReports: "رپورٹس",
    modalTitle: "رپورٹ دیکھیں"
  }
};

let currentLang = "en";

// Set Language
function setLang(lang) {
  currentLang = lang;
  const t = translations[lang];

  // Page title
  document.getElementById("page-title").innerText = t.title;

  // Update report cards
  document.querySelectorAll(".report-card").forEach(card => {
    const labels = card.querySelectorAll("span.label-name, span.label-type, span.label-date");
    if (labels.length === 3) {
      labels[0].innerText = t.name + ":";
      labels[1].innerText = t.report + ":";
      labels[2].innerText = t.date + ":";
    }

    // Update buttons + font
    const viewBtn = card.querySelector(".view-btn");
    const downloadBtn = card.querySelector(".download-btn");

    viewBtn.innerText = t.view;
    downloadBtn.innerText = t.download;

    if (lang === "ur") {
      viewBtn.style.fontFamily = "'Noto Nastaliq Urdu', serif";
      downloadBtn.style.fontFamily = "'Noto Nastaliq Urdu', serif";
    } else {
      viewBtn.style.fontFamily = "Arial, sans-serif";
      downloadBtn.style.fontFamily = "Arial, sans-serif";
    }
  });

  // Update bottom nav labels
  document.getElementById("nav-profile-label").innerText = t.navProfile;
  document.getElementById("nav-patients-label").innerText = t.navPatients;
  document.getElementById("nav-appointments-label").innerText = t.navAppointments;
  document.getElementById("nav-reports-label").innerText = t.navReports;

  // Modal title
  document.getElementById("modal-title").innerText = t.modalTitle;

  // Font + direction
  if (lang === "ur") {
    document.body.style.fontFamily = "'Noto Nastaliq Urdu', serif";
    document.body.setAttribute("dir", "rtl");
  } else {
    document.body.style.fontFamily = "Arial, sans-serif";
    document.body.setAttribute("dir", "ltr");
  }
}

// ==== Modal Preview ====
const modal = document.getElementById("report-modal");
const reportFrame = document.getElementById("report-frame");
const closeModal = document.getElementById("close-modal");

// View button action → open modal with preview
document.querySelectorAll(".view-btn").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    if (index === 0) {
      reportFrame.src = "reports/sample-bloodtest.pdf"; 
    } else if (index === 1) {
      reportFrame.src = "reports/sample-xray.pdf";
    } else {
      reportFrame.src = "reports/sample.pdf"; 
    }

    modal.style.display = "flex";
    document.getElementById("modal-title").innerText =
      currentLang === "ur" ? translations.ur.modalTitle : translations.en.modalTitle;
  });
});

// Close modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
  reportFrame.src = "";
});

// Close modal on outside click
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    reportFrame.src = "";
  }
});

// ==== Download Button ====
document.querySelectorAll(".download-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    alert(currentLang === "ur" ? "⬇️ رپورٹ ڈاؤن لوڈ ہو رہی ہے" : "⬇️ Report downloading...");
    const link = document.createElement("a");
    link.href = "reports/sample.pdf"; // apna path daalna
    link.download = "report.pdf";
    link.click();
  });
});

// ==== Language switch buttons ====
document.querySelector(".lang-en").onclick = () => setLang("en");
document.querySelector(".lang-ur").onclick = () => setLang("ur");

// ==== Back Button ====
document.getElementById("back-btn").addEventListener("click", () => {
  window.location.href = "home.html";
});


// Init default
setLang("en");
