// English and Urdu translations
const translations = {
  en: {
    title: "Signup",
    subtitle: "Signup for a new account",
    name: "Full Name",
    placeholderName:"Enter your full name",
    email: "Email",
    placeholderEmail:"Enter your email",
    password: "Password",
    hint: "Password must be at least 8 characters",
    confirm: "Confirm Password",
    remember: "Remember Me",
    terms: 'I accept the <a href="#">Terms and Conditions</a> & <a href="#">Privacy Policy</a>',
    signup: "Signup",
    google: "Continue with Google",
    footer: 'Already have an account? <a href="login.html">Login</a>'
  },
  ur: {
    title: "سائن اپ",
    subtitle: "نیا اکاؤنٹ بنانے کے لیے سائن اپ کریں",
    name: "نام",
    placeholderName:"اپنا پورا نام درج کریں",
    email: "ای میل",
    placeholderEmail:"اپنی ای میل درج کریں",
    password: "پاس ورڈ",
    hint: "پاس ورڈ کم از کم 8 حروف کا ہونا چاہیے",
    confirm: "پاس ورڈ دوبارہ لکھیں",
    remember: "یاد رکھیں",
    terms: 'میں قبول کرتا ہوں <a href="#">شرائط</a> اور <a href="#">رازداری کی پالیسی</a>',
    signup: "سائن اپ",
    google: "گوگل کے ساتھ جاری رکھیں",
    footer: 'پہلے سے اکاؤنٹ ہے؟ <a href="login.html">لاگ ان</a>'
  }
};

// Switch language function
function switchLanguage(lang) {
  currentLang = lang; // <-- keeps track of which language is active
  const t = translations[lang];
  // rest of your UI updates...
  document.getElementById("form-title").innerHTML = translations[lang].title;
  document.getElementById("form-subtitle").innerHTML = translations[lang].subtitle;
  document.getElementById("label-name").innerHTML = translations[lang].name;
  document.getElementById("label-email").innerHTML = translations[lang].email;
  document.getElementById("label-password").innerHTML = translations[lang].password;
  document.getElementById("password-hint").innerHTML = translations[lang].hint;
  document.getElementById("label-confirm").innerHTML = translations[lang].confirm;
  document.getElementById("remember-text").innerHTML = translations[lang].remember;
  document.getElementById("terms-text").innerHTML = translations[lang].terms;
  document.getElementById("signup-btn").innerHTML = translations[lang].signup;
  document.getElementById("google-btn").innerHTML = translations[lang].google;
  document.getElementById("footer-text").innerHTML = translations[lang].footer;

 // placeholders
  document.getElementById("name").placeholder = translations[lang].placeholderName;
  document.getElementById("email").placeholder = translations[lang].placeholderEmail;

  if (lang === "ur") {
    document.body.style.fontFamily = "'Noto Nastaliq Urdu', serif";
    document.body.setAttribute("dir", "rtl");
  } else {
    document.body.style.fontFamily = "Arial, sans-serif";
    document.body.setAttribute("dir", "ltr");
  }
}
let currentLang = "en"; // default language is English


// Event Listeners for language buttons
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
switchLanguage("en");

// Signup form validation
const form = document.getElementById("signup-form");
const passwordInput = document.getElementById("password");
const passwordHint = document.getElementById("password-hint");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // stop default form submit

  // Check password length
  if (passwordInput.value.length < 8) {
    passwordHint.style.display = "block";  
    passwordHint.innerText =
      currentLang === "ur"
        ? "پاس ورڈ کم از کم 8 حروف کا ہونا چاہیے"
        : "Password must be at least 8 characters";
    return; // stop submit if invalid
  } else {
    passwordHint.style.display = "none";
  }

  //  Signup successful → Redirect to dashboard
  alert(currentLang === "ur" ? "سائن اپ کامیاب ✅" : "Signup successful ✅");
  window.location.href = "./Dashboard.html"; // redirect to dashboard page
});

