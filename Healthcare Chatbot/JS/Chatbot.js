// Translations
const translations = {
  en: {
    title: "Healthcare Chatbot",
    typing: "Bot is typing...",
    placeholder: "Type your message...",
    send: "Send",
    hello: "Hello! How can I help you today?",
    botReply: "This is a test reply!"
  },
  ur: {
    title: "ہیلتھ کیئر چیٹ بوٹ",
    typing: "بوٹ لکھ رہا ہے...",
    placeholder: "اپنا پیغام لکھیں...",
    send: "بھیجیں",
    hello: "السلام علیکم! میں آج آپ کی کیسے مدد کر سکتا ہوں؟",
    botReply: "یہ ایک ٹیسٹ جواب ہے!"
  }
};

let currentLang = "en"; // default language

// Switch language
function switchChatLanguage(lang) {
  currentLang = lang; // store selected language
  document.getElementById("title-text").innerHTML = translations[lang].title;
  document.getElementById("typing").innerHTML = translations[lang].typing;
  document.getElementById("user-input").placeholder = translations[lang].placeholder;
  document.getElementById("send-btn").innerHTML = translations[lang].send;

  const chatWindow = document.getElementById("chat-window");
  chatWindow.innerHTML = `<div class="message bot">${translations[lang].hello}</div>`;

  if (lang === "ur") {
    document.body.style.fontFamily = "'Noto Nastaliq Urdu', serif";
    document.body.setAttribute("dir", "rtl");
  } else {
    document.body.style.fontFamily = "Arial, sans-serif";
    document.body.setAttribute("dir", "ltr");
  }
}

// Send message function
function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  const chatWindow = document.getElementById("chat-window");
  const typing = document.getElementById("typing");

  if (message !== "") {
    // User message
    const userMsg = document.createElement("div");
    userMsg.classList.add("message", "user");
    userMsg.textContent = message;
    chatWindow.appendChild(userMsg);
    input.value = "";
    chatWindow.scrollTop = chatWindow.scrollHeight;

    // Show typing
    typing.style.display = "block";

    // Bot reply after delay
    setTimeout(() => {
      typing.style.display = "none"; // hide typing
      const botMsg = document.createElement("div");
      botMsg.classList.add("message", "bot");
      botMsg.textContent = translations[currentLang].botReply;
      chatWindow.appendChild(botMsg);
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }, 1500);
  }
}

// Event listeners
document.querySelector(".lang-en").addEventListener("click", () => switchChatLanguage("en"));
document.querySelector(".lang-ur").addEventListener("click", () => switchChatLanguage("ur"));
document.getElementById("send-btn").addEventListener("click", sendMessage);
document.getElementById("user-input").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});

const savedLang = localStorage.getItem("lang") || "en";
switchLanguage(savedLang);


// Back button
document.getElementById("back-btn").addEventListener("click", () => {
  if (currentLang === "ur") {
    alert("آپ واپس ڈیش بورڈ پر جا رہے ہیں۔");
  } else {
    alert("You are going back to the Dashboard.");
  }
  window.location.href = "Dashboard.html"; // redirect to Dashboard
});


// Default
switchChatLanguage("en");
