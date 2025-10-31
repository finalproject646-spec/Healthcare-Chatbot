/* Notifications module */

// Use existing currentLang if set, otherwise fallback
const lang = (typeof currentLang !== "undefined") ? currentLang : (localStorage.getItem("lang") || "en");

// Sidebar item & panel
const notifMenuText = document.getElementById("menu-notifications"); // label span
const notifMenuItem = notifMenuText ? notifMenuText.closest('.menu-item') : null;
const panel = document.getElementById("notifications-panel");
const notifListEl = document.getElementById("notifications-list");
const markAllBtn = document.getElementById("mark-all-btn");
const clearAllBtn = document.getElementById("clear-all-btn");
const closeBtn = document.getElementById("close-notifications");
const loadSampleBtn = document.getElementById("load-sample");
const notifCountEl = document.getElementById("notif-count");

if (!panel || !notifListEl) {
  console.warn("Notification panel elements missing.");
} else {
  // sample notifications structure
  const sampleNotifications = [
    {
      id: generateId(),
      type: "appointment",
      title_en: "Appointment confirmed with Dr. Ali — 5 Nov, 10:00 AM",
      title_ur: "ڈاکٹر علی کے ساتھ ملاقات کی تصدیق — 5 نومبر، صبح 10:00",
      time: timestampMinutesAgo(45),
      unread: true,
      payload: { appointmentId: 102 }
    },
    {
      id: generateId(),
      type: "report",
      title_en: "Your blood test report is now available",
      title_ur: "آپ کی خون کی جانچ کی رپورٹ دستیاب ہے",
      time: timestampHoursAgo(5),
      unread: true,
      payload: { reportId: 501 }
    },
    {
      id: generateId(),
      type: "reminder",
      title_en: "Reminder: Appointment tomorrow at 9:30 AM",
      title_ur: "یاددہانی: کل ملاقات صبح 9:30 بجے",
      time: timestampDaysAgo(0),
      unread: false,
      payload: { appointmentId: 103 }
    },
  ];

  // storage helpers
  const STORAGE_KEY = "hc_notifications_v1";

  function loadNotifications() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // initialize with sample set
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleNotifications));
      return sampleNotifications.slice();
    }
    try {
      return JSON.parse(raw);
    } catch (e) {
      console.error("Failed to parse notifications", e);
      return [];
    }
  }

  function saveNotifications(arr) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  }

  // render
  function renderNotifications() {
    const list = loadNotifications();
    // sort: newest unread first
    list.sort((a,b) => (b.unread - a.unread) || (new Date(b.time) - new Date(a.time)));
    notifListEl.innerHTML = "";

    list.forEach(item => {
      const title = (lang === "ur") ? (item.title_ur || item.title_en) : (item.title_en || item.title_ur);
      const wrapper = document.createElement("div");
      wrapper.className = "notification-item " + (item.unread ? "unread" : "read");
      wrapper.dataset.id = item.id;

      // icon by type
      const icon = document.createElement("div");
      icon.className = "notification-icon";
      icon.textContent = iconForType(item.type);

      const body = document.createElement("div");
      body.className = "notification-body";
      const h = document.createElement("p");
      h.className = "notification-title";
      h.innerText = title;
      const t = document.createElement("div");
      t.className = "notification-time";
      t.innerText = timeAgo(item.time);

      const actions = document.createElement("div");
      actions.className = "notification-actions";

      // Add action buttons based on type
      if (item.type === "report") {
        const viewBtn = actionButton(lang === "ur" ? "رپورٹ دیکھیں" : "View Report", () => viewReport(item));
        actions.appendChild(viewBtn);
      } else if (item.type === "appointment" || item.type === "reminder") {
        const viewBtn = actionButton(lang === "ur" ? "ملاقات دیکھیں" : "View Appointment", () => viewAppointment(item));
        actions.appendChild(viewBtn);
      } else {
        const okBtn = actionButton(lang === "ur" ? "ٹھیک ہے" : "OK", () => markRead(item.id));
        okBtn.classList.add("secondary");
        actions.appendChild(okBtn);
      }

      body.appendChild(h);
      body.appendChild(t);
      body.appendChild(actions);

      wrapper.appendChild(icon);
      wrapper.appendChild(body);

      // clicking card marks it read and can open action
      wrapper.addEventListener("click", (ev) => {
        // prevent double-executing action clicks
        if (ev.target.closest(".btn-action")) return;
        toggleRead(item.id, true);
      });

      notifListEl.appendChild(wrapper);
    });

    // update count
    const unread = list.filter(i => i.unread).length;
    notifCountEl.innerText = (lang === "ur") ? `${unread} نئی` : `${unread} new`;
    // update badge on sidebar (if present)
    updateSidebarBadge(unread);
  }

  // helper functions
  function iconForType(type) {
    switch(type) {
      case "appointment": return "📅";
      case "report": return "🧾";
      case "reminder": return "⏰";
      case "prescription": return "💊";
      default: return "🔔";
    }
  }

  function actionButton(text, handler) {
    const b = document.createElement("button");
    b.className = "btn-action";
    b.innerText = text;
    b.addEventListener("click", (e) => {
      e.stopPropagation();
      handler();
    });
    return b;
  }

  function generateId() {
    return 'n_' + Math.random().toString(36).slice(2,10);
  }

  function timeAgo(iso) {
    const d = new Date(iso);
    const diff = Date.now() - d.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return (lang === "ur") ? "ابھی" : "now";
    if (mins < 60) return (lang === "ur") ? `${mins} منٹ پہلے` : `${mins} min ago`;
    const hrs = Math.floor(mins/60);
    if (hrs < 24) return (lang === "ur") ? `${hrs} گھنٹے پہلے` : `${hrs} hr ago`;
    const days = Math.floor(hrs/24);
    return (lang === "ur") ? `${days} دن پہلے` : `${days} day(s) ago`;
  }

  function timestampMinutesAgo(m) {
    return new Date(Date.now() - m * 60000).toISOString();
  }
  function timestampHoursAgo(h) {
    return new Date(Date.now() - h * 3600000).toISOString();
  }
  function timestampDaysAgo(d) {
    return new Date(Date.now() - d * 86400000).toISOString();
  }

  // actions
  function toggleRead(id, makeRead) {
    const arr = loadNotifications();
    const idx = arr.findIndex(x => x.id === id);
    if (idx === -1) return;
    arr[idx].unread = (typeof makeRead === "boolean") ? makeRead : !arr[idx].unread;
    saveNotifications(arr);
    renderNotifications();
  }

  function markRead(id) { toggleRead(id, true); }

  function markAllRead() {
    const arr = loadNotifications().map(x => ({...x, unread: false}));
    saveNotifications(arr);
    renderNotifications();
  }

  function clearAll() {
    localStorage.removeItem(STORAGE_KEY);
    notifListEl.innerHTML = "";
    notifCountEl.innerText = (lang === "ur") ? "0 نئی" : "0 new";
    updateSidebarBadge(0);
  }

  // action handlers for buttons
  function viewReport(item) {
    // Custom: open reports page with id
    alert((lang === "ur") ? "رپورٹ کھول رہی ہے…" : "Opening report...");
    // example redirect:
    // window.location.href = `Reports.html?reportId=${item.payload.reportId}`;
  }

  function viewAppointment(item) {
    alert((lang === "ur") ? "ملاقات کی تفصیل کھول رہی ہے…" : "Opening appointment...");
    // example redirect:
    // window.location.href = `Appointment.html?id=${item.payload.appointmentId}`;
  }

  // update badge function (if your sidebar has .badge element near notifications)
  function updateSidebarBadge(unreadCount) {
    // find badge next to menu-notifications
    if (!notifMenuItem) return;
    const badge = notifMenuItem.querySelector('.badge');
    if (!badge) return;
    if (unreadCount > 0) {
      badge.style.display = "inline-block";
      badge.innerText = unreadCount;
    } else {
      badge.style.display = "none";
    }
  }

  // open/close panel
  function openPanel() {
    panel.classList.add("open");
    panel.setAttribute("aria-hidden", "false");
    renderNotifications();
  }
  function closePanel() {
    panel.classList.remove("open");
    panel.setAttribute("aria-hidden", "true");
  }

  // event wiring
  if (notifMenuItem) {
    notifMenuItem.addEventListener("click", (e) => {
      e.preventDefault();
      const open = panel.classList.contains("open");
      if (open) closePanel(); else openPanel();
    });
  }
  closeBtn.addEventListener("click", closePanel);
  markAllBtn.addEventListener("click", markAllRead);
  clearAllBtn.addEventListener("click", () => {
    if (confirm(lang === "ur" ? "کیا آپ واقعی تمام اطلاعات صاف کرنا چاہتے ہیں؟" : "Clear all notifications?")) {
      clearAll();
    }
  });

  loadSampleBtn.addEventListener("click", () => {
    // append a new sample notification
    const arr = loadNotifications();
    arr.unshift({
      id: generateId(),
      type: "appointment",
      title_en: "New appointment booked with Dr. Sana — 10 Nov, 11:00 AM",
      title_ur: "نئی ملاقات ڈاکٹر ثناء کے ساتھ بک ہو گئی — 10 نومبر، صبح 11:00",
      time: new Date().toISOString(),
      unread: true,
      payload: { appointmentId: 999 }
    });
    saveNotifications(arr);
    renderNotifications();
  });

  // initial render and badge update
  renderNotifications();
}

// === Notification Panel Toggle ===
const notifBtn = document.querySelector('#menu-notifications');
const notifPanel = document.querySelector('#notification-panel');
const closeNotif = document.querySelector('#close-notif');

if (notifBtn && notifPanel && closeNotif) {
  notifBtn.addEventListener('click', (e) => {
    e.preventDefault();
    notifPanel.classList.add('active');
  });

  closeNotif.addEventListener('click', () => {
    notifPanel.classList.remove('active');
  });
}
