// Sample Data
let patientsData = [
  { id: "001", en: { name: "Ali Khan", age: "32", gender: "Male", contact: "0300-1234567" }, ur: { name: "علی خان", age: "32", gender: "مرد", contact: "0300-1234567" }},
  { id: "002", en: { name: "Ayesha Bibi", age: "28", gender: "Female", contact: "0312-9876543" }, ur: { name: "عائشہ بی بی", age: "28", gender: "عورت", contact: "0312-9876543" }}
];

const translationsPatients = {
  en: {
    title: "Patients Records",
    addBtn: "Add Patient",
    searchPlaceholder: "Search by ID or Name",
    table: {
      id: "ID",
      name: "Name",
      age: "Age",
      gender: "Gender",
      contact: "Contact",
      actions: "Actions",
      view: "View",
      edit: "Edit",
      delete: "Delete"
    },
    nav: {
      profile: "Profile",
      patients: "Patients Records",
      appointments: "Appointments",
      reports: "Reports"
    }
  },
  ur: {
    title: "مریض کا ریکارڈ",
    addBtn: "مریض شامل کریں",
    searchPlaceholder: "آئی ڈی یا نام سے تلاش کریں",
    table: {
      id: "آئی ڈی",
      name: "نام",
      age: "عمر",
      gender: "جنس",
      contact: "رابطہ",
      actions: "عمل",
      view: "تفصیل",
      edit: "ترمیم",
      delete: "حذف"
    },
    nav: {
      profile: "پروفائل",
      patients: "مریض کا ریکارڈ",
      appointments: "ملاقاتیں",
      reports: "رپورٹس"
    }
  }
};

let currentLang = "en";
let editIndex = null;

// Render Patients
function renderPatients(filteredData = patientsData) {
  const tbody = document.getElementById("patients-body");
  tbody.innerHTML = "";
  filteredData.forEach((p, i) => {
    tbody.innerHTML += `
      <tr>
        <td>${p.id}</td>
        <td>${p[currentLang].name}</td>
        <td>${p[currentLang].age}</td>
        <td>${p[currentLang].gender}</td>
        <td>${p[currentLang].contact}</td>
        <td>
          <button class="view-btn" data-i="${i}">${translationsPatients[currentLang].table.view}</button>
          <button class="edit-btn" data-i="${i}">${translationsPatients[currentLang].table.edit}</button>
          <button class="delete-btn" data-i="${i}">${translationsPatients[currentLang].table.delete}</button>
        </td>
      </tr>
    `;
  });
  attachActions();
}

// Language
function setPatientsLang(lang){
  currentLang = lang;

  // Title + Table Headings
  document.getElementById("patients-title").innerText = translationsPatients[lang].title;
  document.querySelector("#th-name").innerText = translationsPatients[lang].table.name;
  document.querySelector("#th-age").innerText = translationsPatients[lang].table.age;
  document.querySelector("#th-gender").innerText = translationsPatients[lang].table.gender;
  document.querySelector("#th-contact").innerText = translationsPatients[lang].table.contact;
  document.querySelector("#th-actions").innerText = translationsPatients[lang].table.actions;

  // Search + Add Btn
  document.getElementById("search").placeholder = translationsPatients[lang].searchPlaceholder;
  document.getElementById("add-patient-btn").innerText = translationsPatients[lang].addBtn;

  // Bottom Nav
  document.getElementById("nav-profile-label").innerText = translationsPatients[lang].nav.profile;
  document.getElementById("nav-patients-label").innerText = translationsPatients[lang].nav.patients;
  document.getElementById("nav-appointments-label").innerText = translationsPatients[lang].nav.appointments;
  document.getElementById("nav-reports-label").innerText = translationsPatients[lang].nav.reports;

  // ✅ Urdu & English Buttons bhi update
  document.querySelector(".lang-en").style.fontFamily = "Arial, sans-serif";
  document.querySelector(".lang-ur").style.fontFamily = "'Noto Nastaliq Urdu', serif";

  // Font + Direction + ✅ Apply to all interactive elements
  if(lang==="ur"){ 
    document.body.style.fontFamily = "'Noto Nastaliq Urdu', serif"; 
    document.body.setAttribute("dir","rtl"); 
    document.querySelectorAll("button, input, select, th, td, .label").forEach(el=>{
      el.style.fontFamily = "'Noto Nastaliq Urdu', serif";
    });
  }
  else { 
    document.body.style.fontFamily = "Arial, sans-serif"; 
    document.body.setAttribute("dir","ltr"); 
    document.querySelectorAll("button, input, select, th, td, .label").forEach(el=>{
      el.style.fontFamily = "Arial, sans-serif";
    });
  }

  renderPatients();
}



// Modal
const modal = document.getElementById("patient-modal");
const closeModal = document.getElementById("close-modal");
const form = document.getElementById("patient-form");
const modalTitle = document.getElementById("modal-title");

document.getElementById("add-patient-btn").addEventListener("click", () => {
  editIndex = null;
  modalTitle.innerText = currentLang==="ur" ? "مریض شامل کریں" : "Add Patient";
  form.reset();
  modal.style.display = "flex";
});

closeModal.addEventListener("click", ()=> modal.style.display="none");

form.addEventListener("submit", e => {
  e.preventDefault();
  const id = editIndex===null ? (patientsData.length+1).toString().padStart(3,"0") : patientsData[editIndex].id;
  const newPatient = {
    id,
    en: { name: document.getElementById("p-name").value, age: document.getElementById("p-age").value, gender: document.getElementById("p-gender").value, contact: document.getElementById("p-contact").value },
    ur: { 
      name: document.getElementById("p-name").value, 
      age: document.getElementById("p-age").value, 
      gender: document.getElementById("p-gender").value==="Male"?"مرد":"عورت", 
      contact: document.getElementById("p-contact").value 
    }
  };
  if(editIndex===null) patientsData.push(newPatient);
  else patientsData[editIndex] = newPatient;
  modal.style.display="none";
  renderPatients();
});

// Attach actions
function attachActions(){
  document.querySelectorAll(".view-btn").forEach(btn => btn.onclick=()=>{
    const p = patientsData[btn.dataset.i][currentLang];
    alert(`${p.name}\n${p.age} | ${p.gender}\n${p.contact}`);
  });
  document.querySelectorAll(".edit-btn").forEach(btn => btn.onclick=()=>{
    editIndex = btn.dataset.i;
    const p = patientsData[editIndex].en;
    document.getElementById("p-name").value = p.name;
    document.getElementById("p-age").value = p.age;
    document.getElementById("p-gender").value = p.gender;
    document.getElementById("p-contact").value = p.contact;
    modalTitle.innerText = currentLang==="ur" ? "مریض میں ترمیم کریں" : "Edit Patient";
    modal.style.display="flex";
  });
  document.querySelectorAll(".delete-btn").forEach(btn => btn.onclick=()=>{
    if(confirm("Delete this patient?")){ patientsData.splice(btn.dataset.i,1); renderPatients(); }
  });
}

// Search (Works for English + Urdu + ID)
document.getElementById("search").addEventListener("input", function(){
  const val = this.value.trim();
  if(val === ""){
    renderPatients(); // show all if empty
    return;
  }

  const filtered = patientsData.filter(p => {
    const name = p[currentLang].name;
    const id = p.id.toString();

    if(currentLang === "en"){
      return (name.toLowerCase().includes(val.toLowerCase()) || id.includes(val));
    } else {
      return (name.includes(val) || id.includes(val));
    }
  });

  renderPatients(filtered);
});

// Language toggle
document.querySelector(".lang-en").onclick = ()=> setPatientsLang("en");
document.querySelector(".lang-ur").onclick = ()=> setPatientsLang("ur");

// Init
setPatientsLang("en");

// Back button
document.getElementById("back-btn").addEventListener("click", ()=>{
  window.location.href = "home.html";  // direct home page pe le jaye
});