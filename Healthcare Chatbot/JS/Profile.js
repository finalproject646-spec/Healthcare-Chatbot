//  Language translations
const translationsProfile = {
  en: {
    title: "Profile",
    profile: "Profile",
    patients: "Patients Records",
    appointments: "Appointments",
    reports: "Reports",
    edit: "Edit Profile",
    logout: "Logout",
    changePic: "Change",
    name: "User Name",
    username: "@username",
    email: "📧 example@email.com",
    contact: "📞 0000-0000000",
    dob: "🎂 Date of Birth: DD-MM-YYYY",
    gender: "👤 Gender: Not Set",
    address: "🏠 Address: Not Provided",
    language: "🌐 Preferred Language: English"
  },
  ur: {
    title: "پروفائل",
    profile: "پروفائل",
    patients: "مریض کا ریکارڈ",
    appointments: "ملاقاتیں",
    reports: "رپورٹس",
    edit: "پروفائل میں ترمیم کریں",
    logout: "لاگ آؤٹ",
    changePic: "تبدیل کریں",
    name: "صارف کا نام",
    username: "@صارف",
    email: "📧 ای میل: مثال@ای میل.کوم",
    contact: "📞 فون نمبر: 0000-0000000",
    dob: "🎂 تاریخ پیدائش: DD-MM-YYYY",
    gender: "👤 جنس: مقرر نہیں",
    address: "🏠 پتہ: فراہم نہیں کیا گیا",
    language: "🌐 پسندیدہ زبان: اردو"
  }
};

//  Language toggle
document.querySelector(".lang-en").addEventListener("click", () => setProfileLang("en"));
document.querySelector(".lang-ur").addEventListener("click", () => setProfileLang("ur"));

function setProfileLang(lang) {
  document.getElementById("profile-title").innerText = translationsProfile[lang].title;
  document.getElementById("profile-label").innerText = translationsProfile[lang].profile;
  document.getElementById("nav-patients-label").innerText = translationsProfile[lang].patients;
  document.getElementById("nav-appointments-label").innerText = translationsProfile[lang].appointments;
  document.getElementById("nav-reports-label").innerText = translationsProfile[lang].reports;
  document.getElementById("edit-btn").innerText = translationsProfile[lang].edit;
  document.getElementById("logout-btn").innerText = translationsProfile[lang].logout;
  document.getElementById("change-pic-btn").innerText = translationsProfile[lang].changePic;

  // Name & Username
  document.getElementById("user-name").innerText = translationsProfile[lang].name;
  document.getElementById("username").innerText = translationsProfile[lang].username;

  // Profile Details
  document.getElementById("user-email").innerText = translationsProfile[lang].email;
  document.getElementById("user-contact").innerText = translationsProfile[lang].contact;
  document.getElementById("user-dob").innerText = translationsProfile[lang].dob;
  document.getElementById("user-gender").innerText = translationsProfile[lang].gender;
  document.getElementById("user-address").innerText = translationsProfile[lang].address;
  document.getElementById("user-language").innerText = translationsProfile[lang].language;

  // Apply font + direction
  if (lang === "ur") {
    document.body.style.fontFamily = "'Noto Nastaliq Urdu', serif";
    document.body.setAttribute("dir", "rtl");
  } else {
    document.body.style.fontFamily = "Arial, sans-serif";
    document.body.setAttribute("dir", "ltr");
  }
}

//  Navigation
document.getElementById("nav-profile").addEventListener("click", () => window.location.href = "profile.html");
document.getElementById("nav-patients").addEventListener("click", () => window.location.href = "patients.html");
document.getElementById("nav-appointments").addEventListener("click", () => window.location.href = "appointments.html");
document.getElementById("nav-reports").addEventListener("click", () => window.location.href = "reports.html");

//  Default language set
setProfileLang("en");

//  Modal Logic
document.addEventListener("DOMContentLoaded", () => {
  const editBtn = document.getElementById("edit-btn");
  const modal = document.getElementById("edit-modal");
  const closeModal = document.getElementById("close-modal");
  const editForm = document.getElementById("edit-profile-form");

  // Open modal
  if (editBtn) {
    editBtn.addEventListener("click", () => {
      modal.style.display = "flex";
    });
  }

  // Close modal
  if (closeModal) {
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  // Cancel button logic
const cancelBtn = document.getElementById("cancel-btn");
if (cancelBtn) {
  cancelBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
}

  // Save profile
  if (editForm) {
    editForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Get values
      const name = document.getElementById("edit-name").value || "User Name";
      const username = document.getElementById("edit-username").value || "@username";
      const email = document.getElementById("edit-email").value || "example@email.com";
      const contact = document.getElementById("edit-contact").value || "0000-0000000";
      const dob = document.getElementById("edit-dob").value || "DD-MM-YYYY";
      const gender = document.getElementById("edit-gender").value || "Not Set";
      const address = document.getElementById("edit-address").value || "Not Provided";
      const language = document.getElementById("edit-language").value || "English";

      // Update UI
      document.getElementById("user-name").innerText = name;
      document.getElementById("username").innerText = username;
      document.getElementById("user-email").innerText = "📧 " + email;
      document.getElementById("user-contact").innerText = "📞 " + contact;
      document.getElementById("user-dob").innerText = "🎂 " + dob;
      document.getElementById("user-gender").innerText = "👤 " + gender;
      document.getElementById("user-address").innerText = "🏠 " + address;
      document.getElementById("user-language").innerText = "🌐 " + language;

      modal.style.display = "none"; // close modal
    });
  }
});

//  Profile Picture Change
const changePicBtn = document.getElementById("change-pic-btn");
const fileInput = document.getElementById("file-input");
const profileImg = document.getElementById("profile-img");

if(changePicBtn && fileInput && profileImg){
  // Jab "Change" button click ho → hidden file input open ho
  changePicBtn.addEventListener("click", () => {
    fileInput.click();
  });

  // Jab user image select kare → preview update ho
  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if(file){
      const reader = new FileReader();
      reader.onload = (e) => {
        profileImg.src = e.target.result; // image ko update karega
      };
      reader.readAsDataURL(file);
    }
  });
}

//  Logout Button
const logoutBtn = document.getElementById("logout-btn");
if(logoutBtn){
  logoutBtn.addEventListener("click", () => {
    // Agar localStorage use kar rahe hain to clear kar do
    localStorage.clear();

    // Redirect to login page
    window.location.href = "login.html";
  });
}

// Back button
document.getElementById("back-btn").addEventListener("click", ()=>{
  window.location.href = "home.html";  // direct home page pe le jaye
});