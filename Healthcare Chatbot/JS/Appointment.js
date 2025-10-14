// Translations 
const translations = {
  en: {
    title: "Book Appointment",
    personal: "Personal Information",
    name: "Full Name",
    contact: "Phone / Email",
    gender: "Gender",
    service: "Service & Doctor",
    selectService: "Select Service",
    selectDoctor: "Select Doctor",
    confirm: "Confirm Appointment",
    date: "Date",
    time: "Time",
    message: "Message",
    confirmBtn: "Confirm",
    cancelBtn: "Cancel",
    summary: "Your Appointment",
    modalTitle: "Edit Appointment",
    rescheduleBtn: "Reschedule",
    modalSaveBtn: "Save",
    modalCloseBtn: "Close",
    placeholderName: "Enter your name",
    placeholderContact: "Enter phone or email",
    placeholderMessage: "Enter message",
    placeholderService: "Select Service",
    placeholderDoctor: "Select Doctor",
    placeholderGender: "Select Gender",
    labels: {
      name: "Name",
      contact: "Contact",
      gender: "Gender",
      service: "Service",
      doctor: "Doctor",
      date: "Date",
      time: "Time",
      message: "Message"
    }
  },
  ur: {
    title: "اپوائنٹمنٹ بُک کریں",
    personal: "ذاتی معلومات",
    name: "پورا نام",
    contact: "فون / ای میل",
    gender: "جنس",
    service: "سروس اور ڈاکٹر",
    selectService: "سروس منتخب کریں",
    selectDoctor: "ڈاکٹر منتخب کریں",
    confirm: "اپوائنٹمنٹ کی تصدیق کریں",
    date: "تاریخ",
    time: "وقت",
    message: "پیغام",
    confirmBtn: "تصدیق کریں",
    cancelBtn: "منسوخ کریں",
    summary: "آپ کی اپوائنٹمنٹ",
    modalTitle: "اپوائنٹمنٹ میں ترمیم کریں",
    rescheduleBtn: "دوبارہ شیڈول کریں",
    modalSaveBtn: "محفوظ کریں",
    modalCloseBtn: "بند کریں",
    placeholderName: "اپنا نام درج کریں",
    placeholderContact: "فون یا ای میل درج کریں",
    placeholderMessage: "پیغام درج کریں",
    placeholderService: "سروس منتخب کریں",
    placeholderDoctor: "ڈاکٹر منتخب کریں",
    placeholderGender: "جنس منتخب کریں",
    labels: {
      name: "نام",
      contact: "رابطہ",
      gender: "جنس",
      service: "سروس",
      doctor: "ڈاکٹر",
      date: "تاریخ",
      time: "وقت",
      message: "پیغام"
    }
  }
};

let currentLang = "en";

// Set Language
function setLang(lang) {
  currentLang = lang;
  const t = translations[lang];

  // Headings & labels
  document.getElementById("page-title").innerText = t.title;
  document.getElementById("personal-title").innerText = t.personal;
  document.getElementById("label-name").innerText = t.name;
  document.getElementById("label-contact").innerText = t.contact;
  document.getElementById("label-gender").innerText = t.gender;
  document.getElementById("service-title").innerText = t.service;
  document.getElementById("label-service").innerText = t.selectService;
  document.getElementById("label-doctor").innerText = t.selectDoctor;
  document.getElementById("confirm-title").innerText = t.confirm;
  document.getElementById("label-date").innerText = t.date;
  document.getElementById("label-time").innerText = t.time;
  document.getElementById("label-message").innerText = t.message;
  document.getElementById("confirm-btn").innerText = t.confirmBtn;
  document.getElementById("cancel-btn").innerText = t.cancelBtn;
  document.getElementById("summary-title").innerText = t.summary;
  document.getElementById("reschedule-btn").innerText = t.rescheduleBtn;
  document.getElementById("modal-title").innerText = t.modalTitle;
  document.getElementById("modal-confirm-btn").innerText = t.modalSaveBtn;
  document.getElementById("modal-close-btn").innerText = t.modalCloseBtn;

  // Modal labels
  document.getElementById("modal-label-name").innerText = t.name;
  document.getElementById("modal-label-contact").innerText = t.contact;
  document.getElementById("modal-label-gender").innerText = t.gender;
  document.getElementById("modal-label-service").innerText = t.selectService;
  document.getElementById("modal-label-doctor").innerText = t.selectDoctor;
  document.getElementById("modal-label-date").innerText = t.date;
  document.getElementById("modal-label-time").innerText = t.time;
  document.getElementById("modal-label-message").innerText = t.message;

  // Placeholders
  document.getElementById("name").placeholder = t.placeholderName;
  document.getElementById("contact").placeholder = t.placeholderContact;
  document.getElementById("message").placeholder = t.placeholderMessage;
  document.getElementById("service").options[0].text = t.placeholderService;
  document.getElementById("doctor").options[0].text = t.placeholderDoctor;
  document.getElementById("gender").options[0].text = t.placeholderGender;

  document.getElementById("modal-name").placeholder = t.placeholderName;
  document.getElementById("modal-contact").placeholder = t.placeholderContact;
  document.getElementById("modal-message").placeholder = t.placeholderMessage;
  document.getElementById("modal-service").options[0].text = t.placeholderService;
  document.getElementById("modal-doctor").options[0].text = t.placeholderDoctor;
  document.getElementById("modal-gender").options[0].text = t.placeholderGender;

  // Font & direction
  if (lang === "ur") {
    document.body.style.fontFamily = "'Noto Nastaliq Urdu', serif";
    document.body.setAttribute("dir", "rtl");
  } else {
    document.body.style.fontFamily = "Arial, sans-serif";
    document.body.setAttribute("dir", "ltr");
  }

  updateSummary();
}

// Update Summary (Right side)
function updateSummary() {
  const t = translations[currentLang];

  // Labels
  document.getElementById("summary-name-label").innerText = t.labels.name + ":";
  document.getElementById("summary-contact-label").innerText = t.labels.contact + ":";
  document.getElementById("summary-gender-label").innerText = t.labels.gender + ":";
  document.getElementById("summary-service-label").innerText = t.labels.service + ":";
  document.getElementById("summary-doctor-label").innerText = t.labels.doctor + ":";
  document.getElementById("summary-date-label").innerText = t.labels.date + ":";
  document.getElementById("summary-time-label").innerText = t.labels.time + ":";
  document.getElementById("summary-message-label").innerText = t.labels.message + ":";

  // Values
  document.getElementById("summary-name").innerText =
    document.getElementById("name").value || "---";
  document.getElementById("summary-contact").innerText =
    document.getElementById("contact").value || "---";
  document.getElementById("summary-gender").innerText =
    document.getElementById("gender").value || "---";
  document.getElementById("summary-service").innerText =
    document.getElementById("service").value || "---";
  document.getElementById("summary-doctor").innerText =
    document.getElementById("doctor").value || "---";
  document.getElementById("summary-date").innerText =
    document.getElementById("date").value || "---";
  document.getElementById("summary-time").innerText =
    document.getElementById("time").value || "---";
  document.getElementById("summary-message").innerText =
    document.getElementById("message").value || "---";
}

// Input listeners
document.querySelectorAll("input, select, textarea").forEach(el => el.addEventListener("input", updateSummary));

// Confirm
document.getElementById("confirm-btn").addEventListener("click", () => {
  alert(currentLang === "ur" ? "✅ اپوائنٹمنٹ کی تصدیق ہو گئی" : "✅ Appointment Confirmed");
});

// Cancel
document.getElementById("cancel-btn").addEventListener("click", () => {
  if (confirm(currentLang === "ur" ? "❌ کیا آپ اپوائنٹمنٹ منسوخ کرنا چاہتے ہیں؟" : "❌ Cancel appointment?")) {
    location.reload();
  }
});

// Reschedule Modal
const modal = document.getElementById("schedule-modal");
document.getElementById("reschedule-btn").addEventListener("click", () => {
  // populate modal with current values
  document.getElementById("modal-name").value = document.getElementById("name").value;
  document.getElementById("modal-contact").value = document.getElementById("contact").value;
  document.getElementById("modal-gender").value = document.getElementById("gender").value;
  document.getElementById("modal-service").value = document.getElementById("service").value;
  document.getElementById("modal-doctor").value = document.getElementById("doctor").value;
  document.getElementById("modal-date").value = document.getElementById("date").value;
  document.getElementById("modal-time").value = document.getElementById("time").value;
  document.getElementById("modal-message").value = document.getElementById("message").value;

  modal.style.display = "flex";
});

// Save from Modal
document.getElementById("modal-confirm-btn").addEventListener("click", () => {
  document.getElementById("name").value = document.getElementById("modal-name").value;
  document.getElementById("contact").value = document.getElementById("modal-contact").value;
  document.getElementById("gender").value = document.getElementById("modal-gender").value;
  document.getElementById("service").value = document.getElementById("modal-service").value;
  document.getElementById("doctor").value = document.getElementById("modal-doctor").value;
  document.getElementById("date").value = document.getElementById("modal-date").value;
  document.getElementById("time").value = document.getElementById("modal-time").value;
  document.getElementById("message").value = document.getElementById("modal-message").value;
  updateSummary();
  modal.style.display = "none";
});

// Close Modal
document.getElementById("modal-close-btn").addEventListener("click", () => { modal.style.display = "none"; });

// Language switch
document.querySelector(".lang-en").onclick = () => setLang("en");
document.querySelector(".lang-ur").onclick = () => setLang("ur");

// Init
setLang("en");

// Back button
document.getElementById("back-btn").addEventListener("click", ()=>{
  window.location.href = "home.html";  
});

