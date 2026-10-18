"use strict";

// Replace these sample projects and contact details with verified owner content.
const siteContent = {
  contact: {
    email: "",
    phone: "",
    whatsapp: "",
    instagram: "",
    location: ""
  },
  portfolio: [
    {
      title: "The golden hour",
      category: "events",
      label: "EVENTS",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85",
      alt: "A couple celebrating together in warm evening light"
    },
    {
      title: "Quiet confidence",
      category: "portraits",
      label: "PORTRAITS",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85",
      alt: "Portrait of a woman looking thoughtfully toward the camera"
    },
    {
      title: "Where we belong",
      category: "documentary",
      label: "DOCUMENTARY",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1400&q=85",
      alt: "A group of friends gathered together outdoors"
    },
    {
      title: "The makers",
      category: "brands",
      label: "BRAND STORIES",
      image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=85",
      alt: "Sunlit creative workspace prepared for a day of work"
    },
    {
      title: "A slower kind of morning",
      category: "film",
      label: "FILM",
      image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1400&q=85",
      alt: "First light rising over a quiet, misty landscape"
    }
  ]
};

const grid = document.querySelector("#portfolio-grid");
const filters = [...document.querySelectorAll(".filter-button")];
const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox.querySelector("figure img");
const lightboxCaption = lightbox.querySelector("figcaption");
let visibleProjects = siteContent.portfolio;
let currentImage = 0;

function renderPortfolio(category = "all") {
  visibleProjects = siteContent.portfolio.filter((project) => category === "all" || project.category === category);
  grid.replaceChildren(...visibleProjects.map((project, index) => {
    const button = document.createElement("button");
    button.className = "portfolio-card";
    button.type = "button";
    button.setAttribute("aria-label", `View ${project.title}, ${project.label.toLowerCase()} sample image`);

    const image = document.createElement("img");
    image.src = project.image;
    image.alt = project.alt;
    image.loading = "lazy";
    image.decoding = "async";

    const meta = document.createElement("span");
    meta.className = "card-meta";
    const title = document.createElement("strong");
    title.textContent = project.title;
    const label = document.createElement("span");
    label.textContent = project.label;
    meta.append(title, label);
    button.append(image, meta);
    button.addEventListener("click", () => openLightbox(index));
    return button;
  }));
}

function openLightbox(index) {
  currentImage = index;
  updateLightbox();
  lightbox.showModal();
}

function updateLightbox() {
  const project = visibleProjects[currentImage];
  lightboxImage.src = project.image;
  lightboxImage.alt = project.alt;
  lightboxCaption.textContent = `${project.title} · ${project.label}`;
}

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    filters.forEach((button) => {
      const active = button === filter;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    renderPortfolio(filter.dataset.filter);
  });
});

lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
lightbox.querySelector(".lightbox-prev").addEventListener("click", () => {
  currentImage = (currentImage - 1 + visibleProjects.length) % visibleProjects.length;
  updateLightbox();
});
lightbox.querySelector(".lightbox-next").addEventListener("click", () => {
  currentImage = (currentImage + 1) % visibleProjects.length;
  updateLightbox();
});
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});
lightbox.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") lightbox.querySelector(".lightbox-prev").click();
  if (event.key === "ArrowRight") lightbox.querySelector(".lightbox-next").click();
});

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-nav");
menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  navigation.classList.toggle("is-open", !isOpen);
});
navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    navigation.classList.remove("is-open");
  }
});

function renderContactDetails() {
  const container = document.querySelector("#contact-details");
  const links = [
    ["email", "Email us", (value) => `mailto:${value}`],
    ["phone", "Call us", (value) => `tel:${value}`],
    ["whatsapp", "WhatsApp", (value) => `https://wa.me/${value.replace(/\D/g, "")}`],
    ["instagram", "Instagram", (value) => value]
  ].filter(([key]) => siteContent.contact[key]);

  if (siteContent.contact.location) {
    const location = document.createElement("span");
    location.textContent = siteContent.contact.location;
    container.append(location);
  }
  links.forEach(([key, label, makeUrl]) => {
    const link = document.createElement("a");
    link.href = makeUrl(siteContent.contact[key]);
    link.textContent = `${label} ↗`;
    if (key === "instagram" || key === "whatsapp") {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
    container.append(link);
  });
  if (!links.length && !siteContent.contact.location) {
    const note = document.createElement("span");
    note.className = "contact-placeholder";
    note.textContent = "Owner: add a verified email, phone or social link in script.js before publishing.";
    container.append(note);
  }
}

const enquiryForm = document.querySelector("#enquiry-form");
const formStatus = document.querySelector("#form-status");
enquiryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!enquiryForm.reportValidity()) return;
  if (enquiryForm.elements.website.value) {
    formStatus.textContent = "This demo enquiry could not be processed.";
    return;
  }
  formStatus.textContent = "Demo only: your enquiry was not sent or saved. Please use the owner’s verified contact details once added.";
  enquiryForm.reset();
});

document.querySelector("#year").textContent = new Date().getFullYear();
renderPortfolio();
renderContactDetails();
