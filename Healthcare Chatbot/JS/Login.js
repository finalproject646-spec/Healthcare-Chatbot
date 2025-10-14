// Translations for Login
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
    footer: 'Don’t have an account? <a href="signup.html">Signup</a>'
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
    footer: 'اکاؤنٹ نہیں ہے؟ <a href="signup.html">سائن اپ</a>'
  }
};

function switchLoginLanguage(lang) {
  currentLang = lang; // <-- keeps track of which language is active
  const t = translations[lang];
  document.getElementById("form-title").innerHTML = translationsLogin[lang].title;
  document.getElementById("form-subtitle").innerHTML = translationsLogin[lang].subtitle;
  
  document.getElementById("label-email").innerHTML = translationsLogin[lang].email;
  document.getElementById("email").placeholder = translationsLogin[lang].emailPlaceholder;

  document.getElementById("label-password").innerHTML = translationsLogin[lang].password;
  document.getElementById("password").placeholder = translationsLogin[lang].passwordPlaceholder;

  document.getElementById("remember-text").innerHTML = translationsLogin[lang].remember;
  document.getElementById("login-btn").innerHTML = translationsLogin[lang].login;
  document.getElementById("google-btn").innerHTML = translationsLogin[lang].google;
  document.getElementById("footer-text").innerHTML = translationsLogin[lang].footer;

  if (lang === "ur") {
    document.body.style.fontFamily = "'Noto Nastaliq Urdu', serif";
    document.body.setAttribute("dir", "rtl");
  } else {
    document.body.style.fontFamily = "Arial, sans-serif";
    document.body.setAttribute("dir", "ltr");
  }
}

let currentLang = "en"; // default language is English


/// Event Listeners for language buttons
if (document.querySelector(".lang-en")) {
  document.querySelector(".lang-en").addEventListener("click", () => {
    localStorage.setItem("lang", "en");   //  save to localStorage
    switchLanguage("en");                 //  apply immediately
  });
}

if (document.querySelector(".lang-ur")) {
  document.querySelector(".lang-ur").addEventListener("click", () => {
    localStorage.setItem("lang", "ur");   //  save to localStorage
    switchLanguage("ur");                 //  apply immediately
  });
}
// On page load → apply saved language
const savedLang = localStorage.getItem("lang") || "en";
switchLanguage(savedLang);



// Default language
if (document.getElementById("loginForm")) {
  switchLoginLanguage("en");
}

//Login form validation and submission
const loginForm = document.getElementById("login-form");
const loginPassword = document.getElementById("password");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // ✅ password validation (example)
  if (loginPassword.value.length < 8) {
    alert(currentLang === "ur" 
      ? "پاس ورڈ کم از کم 8 حروف کا ہونا چاہیے" 
      : "Password must be at least 8 characters");
    return;
  }

  // ✅ If validation passed → redirect to dashboard
  alert(currentLang === "ur" 
    ? "لاگ ان کامیاب ✅" 
    : "Login successful ✅");

  window.location.href = "./Dashboard.html"; // redirect user
});

//Forget password link
document.getElementById("forgot-link").addEventListener("click", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  
  if (!email) {
    alert(currentLang === "ur" 
      ? "براہ کرم پاس ورڈ ری سیٹ کرنے کے لیے اپنی ای میل درج کریں" 
      : "Please enter your email to reset password");
    return;
  }

  // For backend, Firebase password reset would go here
  alert(currentLang === "ur" 
    ? "آپ کے ای میل پر پاس ورڈ ری سیٹ لنک بھیجا گیا ✅" 
    : "Password reset link has been sent to your email ✅");
});
