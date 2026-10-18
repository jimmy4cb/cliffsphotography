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
      title: "Stories in the community",
      category: "documentary",
      label: "NON-PROFIT",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1400&q=85",
      alt: "A community group spending time together outdoors"
    },
    {
      title: "A day to remember",
      category: "events",
      label: "WEDDING",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85",
      alt: "A couple celebrating their wedding together"
    },
    {
      title: "The groom",
      category: "portraits",
      label: "WEDDING PORTRAIT",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=85",
      alt: "Portrait of a man outdoors in a dark jacket"
    },
    {
      title: "Made with care",
      category: "brands",
      label: "PRODUCT",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=85",
      alt: "A red athletic shoe photographed as a product"
    },
    {
      title: "A moment in the wild",
      category: "film",
      label: "OUTDOOR NATURE",
      image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1400&q=85",
      alt: "Soft morning light over a misty natural landscape"
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
const serviceSelect = enquiryForm.elements.service;
document.querySelectorAll(".package-link").forEach((link) => {
  link.addEventListener("click", () => {
    serviceSelect.value = link.dataset.service;
  });
});

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
