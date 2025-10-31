// --- Translations for Login ---
const translationsLogin = {
  en: {
    title: "Login",
    subtitle: "Login to your account",
    email: "Email",
    emailPlaceholder: "Enter your email",
    password: "Password",
    passwordPlaceholder: "Enter your password",
    remember: "Remember Me",
    login: "Login",
    google: "Continue with Google",
    footer: 'Don’t have an account? <a href="Signup.html">Signup</a>'
  },
  ur: {
    title: "لاگ ان",
    subtitle: "اپنے اکاؤنٹ میں لاگ ان کریں",
    email: "ای میل",
    emailPlaceholder: "اپنا ای میل درج کریں",
    password: "پاس ورڈ",
    passwordPlaceholder: "اپنا پاس ورڈ درج کریں",
    remember: "یاد رکھیں",
    login: "لاگ ان",
    google: "گوگل کے ساتھ جاری رکھیں",
    footer: 'اکاؤنٹ نہیں ہے؟ <a href="Signup.html">سائن اپ</a>'
  }
};

// --- Function: Switch Language ---
function switchLoginLanguage(lang) {
  currentLang = lang;
  const t = translationsLogin[lang];

  document.getElementById("form-title").innerHTML = t.title;
  document.getElementById("form-subtitle").innerHTML = t.subtitle;
  document.getElementById("label-email").innerHTML = t.email;
  document.getElementById("email").placeholder = t.emailPlaceholder;
  document.getElementById("label-password").innerHTML = t.password;
  document.getElementById("password").placeholder = t.passwordPlaceholder;
  document.getElementById("remember-text").innerHTML = t.remember;
  document.getElementById("login-btn").innerHTML = t.login;
  document.getElementById("google-btn").innerHTML = t.google;
  document.getElementById("footer-text").innerHTML = t.footer;

  // Font + direction
  if (lang === "ur") {
    document.body.style.fontFamily = "'Noto Nastaliq Urdu', serif";
    document.body.setAttribute("dir", "rtl");
  } else {
    document.body.style.fontFamily = "Arial, sans-serif";
    document.body.setAttribute("dir", "ltr");
  }
}

// --- Default Language ---
let currentLang = localStorage.getItem("lang") || "en";
switchLoginLanguage(currentLang);

// --- Language Buttons ---
document.querySelector(".lang-en").addEventListener("click", () => {
  localStorage.setItem("lang", "en");
  switchLoginLanguage("en");
});

document.querySelector(".lang-ur").addEventListener("click", () => {
  localStorage.setItem("lang", "ur");
  switchLoginLanguage("ur");
});

// --- LOGIN LOGIC ---
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  const loginPassword = document.getElementById("password");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = loginPassword.value.trim();
    const remember = document.getElementById("remember").checked;

    // Simple password validation
    if (password.length < 8) {
      alert(currentLang === "ur"
        ? "پاس ورڈ کم از کم 8 حروف کا ہونا چاہیے"
        : "Password must be at least 8 characters");
      return;
    }

    //  Fake login simulation
    if (email && password) {
      alert(currentLang === "ur" ? "لاگ ان کامیاب ✅" : "Login successful ✅");

      // Save login state (use sessionStorage for auto logout on browser close)
      sessionStorage.setItem("isLoggedIn", "true");

      // If remember me checked, save email
      if (remember) {
        localStorage.setItem("rememberEmail", email);
        localStorage.setItem("rememberPass", password);
      } else {
        localStorage.removeItem("rememberEmail");
        localStorage.removeItem("rememberPass");
      }

      // Redirect to dashboard
      window.location.href = "Dashboard.html";
    }
  });

  // Autofill remembered email & password
  document.getElementById("email").value = localStorage.getItem("rememberEmail") || "";
  document.getElementById("password").value = localStorage.getItem("rememberPass") || "";
}


// --- PROTECT DASHBOARD PAGE ---
if (window.location.pathname.includes("Dashboard.html")) {
  if (sessionStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "login.html";
  }
}

// --- LOGOUT FUNCTION ---
const logoutBtn = document.getElementById("logout");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    sessionStorage.removeItem("isLoggedIn");
    window.location.href = "login.html";
  });
}
