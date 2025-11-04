// --- Sidebar Toggle ---
const supportSidebar = document.getElementById("support-sidebar");
const supportBtn = document.getElementById("menu-support");
const closeSupport = document.getElementById("close-support");

supportBtn.addEventListener("click", () => {
  supportSidebar.classList.add("active");
});

closeSupport.addEventListener("click", () => {
  supportSidebar.classList.remove("active");
});

// --- Live Chat ---
const startChat = document.getElementById("start-chat");
const chatBox = document.getElementById("chat-box");
const chatMessages = document.getElementById("chat-messages");
const sendMsg = document.getElementById("send-msg");

startChat.addEventListener("click", () => {
  chatBox.classList.toggle("hidden");
});

sendMsg.addEventListener("click", () => {
  const input = document.getElementById("chat-input");
  const msg = input.value.trim();
  if (msg) {
    // User message show
    const userDiv = document.createElement("div");
    userDiv.textContent = "You: " + msg;
    chatMessages.appendChild(userDiv);

    input.value = "";

    // Auto scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // 🔹 Simulate bot reply after 1 second
    setTimeout(() => {
      const botDiv = document.createElement("div");
      botDiv.textContent = "Support: Thanks for your message! Our team will reply shortly.";
      botDiv.style.color = "#2563EB"; // optional styling
      chatMessages.appendChild(botDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
  }
});


// --- Contact Support ---
document.getElementById("send-support").addEventListener("click", () => {
  alert("Your message has been sent! Our support team will contact you soon.");
});


