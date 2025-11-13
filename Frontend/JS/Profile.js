// Profile.js — safe, DOMContentLoaded wrapped and defensive

document.addEventListener("DOMContentLoaded", () => {
  // --- Elements (selected after DOM ready)
  const sidebar = document.getElementById("profile-sidebar");
  const profileNav = document.getElementById("nav-profile");
profileNav.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Profile button clicked ✅");
});

  // Debug helpers
  if (!sidebar) console.error("profile.js: #profile-sidebar not found in DOM");
  if (!profileNav) console.error("profile.js: #nav-profile not found in DOM");

  // Sidebar toggle
  if (profileNav && sidebar) {
    profileNav.addEventListener("click", (e) => {
      e.preventDefault(); // prevent navigation / reload
      sidebar.classList.toggle("open");
    });

    // Close sidebar when clicking outside
    document.addEventListener("click", (e) => {
      // if sidebar not open or we clicked on the profileNav, do nothing
      if (!sidebar.classList.contains("open")) return;
      if (!sidebar.contains(e.target) && !profileNav.contains(e.target)) {
        sidebar.classList.remove("open");
      }
    });
  }

  // ===== Profile Modal Logic (safe guarded) =====
  const sidebarUserImage = document.getElementById("sidebar-user-pic");
  const sidebarUsername = document.getElementById("sidebar-username");
  const sidebarEmail = document.getElementById("sidebar-email");

  const modal = document.getElementById("profile-modal");
  const closeModal = document.getElementById("close-modal");
  const modalProfilePic = document.getElementById("modal-profile-pic");
  const uploadInput = document.getElementById("upload-pic");
  const changePicBtn = document.getElementById("change-pic-btn");
  const saveProfileBtn = document.getElementById("save-profile-btn");
  const editName = document.getElementById("edit-name");
  const editEmail = document.getElementById("edit-email");

  // safe functions
  function openProfileModal() {
    if (!modal) return;
    if (editName && sidebarUsername) editName.value = sidebarUsername.innerText;
    if (editEmail && sidebarEmail) editEmail.value = sidebarEmail.innerText;
    if (modalProfilePic && sidebarUserImage) modalProfilePic.src = sidebarUserImage.src;
    modal.style.display = "flex";
  }

  if (sidebarUserImage) sidebarUserImage.addEventListener("click", openProfileModal);
  if (sidebarUsername) sidebarUsername.addEventListener("click", openProfileModal);
  if (sidebarEmail) sidebarEmail.addEventListener("click", openProfileModal);

  if (closeModal && modal) {
    closeModal.addEventListener("click", () => { modal.style.display = "none"; });
  }

  if (changePicBtn && uploadInput) {
    changePicBtn.addEventListener("click", () => uploadInput.click());
  }

  if (uploadInput && modalProfilePic) {
    uploadInput.addEventListener("change", (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => { modalProfilePic.src = reader.result; };
        reader.readAsDataURL(file);
      }
    });
  }

  if (saveProfileBtn) {
    saveProfileBtn.addEventListener("click", () => {
      if (sidebarUsername && editName) sidebarUsername.innerText = editName.value || "User Name";
      if (sidebarEmail && editEmail) sidebarEmail.innerText = editEmail.value || "user.email@example.com";
      if (sidebarUserImage && modalProfilePic) sidebarUserImage.src = modalProfilePic.src;
      if (modal) modal.style.display = "none";
    });
  }

  // ===== Bilingual Sidebar Switch =====
  const translationsSidebar = {
    en: {
      title: "Healthcare",
      dashboard: "Dashboard",
      notifications: "Notifications",
      reports: "Reports",
      settings: "Settings",
      support: "Support",
    },
    ur: {
      title: "ہیلتھ کیئر",
      dashboard: "ڈیش بورڈ",
      notifications: "اطلاعات",
      reports: "رپورٹس",
      settings: "ترتیبات",
      support: "مدد",
    }
  };

  function setSidebarLang(lang) {
    const t = translationsSidebar[lang] || translationsSidebar.en;

    const elTitle = document.getElementById("sidebar-title");
    const elDashboard = document.getElementById("menu-dashboard");
    const elNotifications = document.getElementById("menu-notifications");
    const elReports = document.getElementById("menu-reports");
    const elSettings = document.getElementById("menu-settings");
    const elSupport = document.getElementById("menu-support");

    if (elTitle) elTitle.innerText = t.title;
    if (elDashboard) elDashboard.innerText = t.dashboard;
    if (elNotifications) elNotifications.innerText = t.notifications;
    if (elReports) elReports.innerText = t.reports;
    if (elSettings) elSettings.innerText = t.settings;
    if (elSupport) elSupport.innerText = t.support;

    // Font direction for Urdu (optional; main language handler may already do this)
    if (lang === "ur") {
      document.body.style.fontFamily = "'Noto Nastaliq Urdu', serif";
      document.body.setAttribute("dir", "rtl");
    } else {
      document.body.style.fontFamily = "Arial, sans-serif";
      document.body.setAttribute("dir", "ltr");
    }
  }

  // expose globally so Home.js can call if needed
  window.setSidebarLang = setSidebarLang;
});


