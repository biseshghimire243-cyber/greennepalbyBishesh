// ============================
// DYNAMIC DATA LOADING
// ============================

// Helper function to handle image paths (supports full URLs and local files)
function getImageUrl(imagePath) {
  if (!imagePath) return 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80';
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  return `images/${imagePath}`;
}

// Load National Parks
async function loadParks() {
  const container = document.getElementById("parksContainer");
  if (!container) return;

  try {
    const response = await fetch("http://localhost:3000/parks");
    if (!response.ok) throw new Error("Failed to fetch parks");
    
    const parks = await response.json();
    if (!parks || parks.length === 0) return;

    container.innerHTML = ""; // Clear fallback HTML only when dynamic data arrives

    parks.forEach(park => {
      const imgSrc = getImageUrl(park.image);
      const tagHTML = park.tag ? `<span class="park-tag ${park.tagClass || 'tag-unesco'}">${park.tag}</span>` : '';

      container.innerHTML += `
        <article class="park-card">
          <div class="card-image">
            <img src="${imgSrc}" alt="${park.name}">
            ${tagHTML}
          </div>
          <div class="card-body">
            <h3>${park.name}</h3>
            <p>${park.description}</p>
          </div>
        </article>
      `;
    });
  } catch (error) {
    console.warn("Server unavailable. Preserving HTML static fallback for Parks.", error);
  }
}

// Load Wildlife
async function loadWildlife() {
  const container = document.getElementById("wildlifeContainer");
  if (!container) return;

  try {
    const response = await fetch("http://localhost:3000/wildlife");
    if (!response.ok) throw new Error("Failed to fetch wildlife");

    const animals = await response.json();
    if (!animals || animals.length === 0) return;

    container.innerHTML = ""; // Clear fallback HTML only when dynamic data arrives

    animals.forEach(animal => {
      const imgSrc = getImageUrl(animal.image);
      const statusHTML = animal.status ? `<span class="status-badge ${animal.statusClass || 'status-endangered'}">${animal.status}</span>` : '';

      container.innerHTML += `
        <article class="wildlife-card">
          <div class="card-image">
            <img src="${imgSrc}" alt="${animal.name}">
            ${statusHTML}
          </div>
          <div class="card-body">
            <h3>${animal.name}</h3>
            <p>${animal.description}</p>
          </div>
        </article>
      `;
    });
  } catch (error) {
    console.warn("Server unavailable. Preserving HTML static fallback for Wildlife.", error);
  }
}

// ============================
// ANIMATED COUNTERS
// ============================
function initCounters() {
  const counters = document.querySelectorAll(".counter");

  counters.forEach(counter => {
    const updateCounter = () => {
      const target = +counter.dataset.target;
      const count = +counter.innerText.replace(/[^0-9]/g, '') || 0;
      const increment = target / 100;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCounter, 20);
      } else {
        counter.innerText = target + (target > 100 ? '+' : '');
      }
    };
    updateCounter();
  });
}

// ============================
// NAVBAR SCROLL EFFECT
// ============================
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".navbar");
  if (nav) {
    if (window.scrollY > 50) {
      nav.classList.add("sticky");
    } else {
      nav.classList.remove("sticky");
    }
  }
});

// ============================
// CONTACT FORM SUBMISSION
// ============================
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value
    };

    try {
      const res = await fetch("http://localhost:3000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      alert(data.message || "Message sent successfully!");
      form.reset();
    } catch (err) {
      console.error("Submission failed:", err);
      alert("Could not reach server. Please try again later.");
    }
  });
}

// ============================
// INITIALIZATION
// ============================
document.addEventListener("DOMContentLoaded", () => {
  loadParks();
  loadWildlife();
  initCounters();
  initContactForm();
});

// ==========================
// GALLERY FILTER
// ==========================

const filterButtons = document.querySelectorAll(".gallery-filter button");
const galleryCards = document.querySelectorAll(".gallery-card");

filterButtons.forEach(button=>{

button.addEventListener("click",()=>{

filterButtons.forEach(btn=>btn.classList.remove("active"));

button.classList.add("active");

const filter = button.dataset.filter;

galleryCards.forEach(card=>{

if(filter==="all"){

card.style.display="block";

}

else if(card.classList.contains(filter)){

card.style.display="block";

}

else{

card.style.display="none";

}

});

});

});