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
      title: "Community voices",
      category: "documentary",
      label: "NON-PROFIT",
      image: "photos/tom-5921.jpg",
      alt: "A community advocate presenting at a Civic Watch Project meeting"
    },
    {
      title: "Portrait in the garden",
      category: "portraits",
      label: "PORTRAIT",
      image: "photos/tom-ogalo-158.jpg",
      alt: "Smiling woman photographed against a leafy garden"
    },
    {
      title: "Everyday product story",
      category: "brands",
      label: "PRODUCT",
      image: "photos/tom-202.jpg",
      alt: "Beauty product photographed on a counter with a colorful background"
    },
    {
      title: "A quiet moment outdoors",
      category: "nature",
      label: "OUTDOOR NATURE",
      image: "photos/lakeside-27.jpg",
      alt: "Two vervet monkeys sitting together on a rock"
    },
    {
      title: "Behind the camera",
      category: "film",
      label: "BEHIND THE SCENES",
      image: "photos/ogalo-japicha-220.jpg",
      alt: "Photographer in a red shirt carrying a camera outdoors"
    },
    {
      title: "A place to refuel",
      category: "brands",
      label: "COMMERCIAL",
      image: "photos/tom-ogalo-24.jpg",
      alt: "Wide view of a fuel station and its forecourt"
    },
    {
      title: "Together at home",
      category: "events",
      label: "COMMUNITY",
      image: "photos/tom-ogalo-107.jpg",
      alt: "Family and friends gathered together outside a home"
    },
    {
      title: "The team gathers",
      category: "events",
      label: "SPORT",
      image: "photos/tom-ogalo-150.jpg",
      alt: "Rugby players gathering on a grassy field"
    },
    {
      title: "A thoughtful moment",
      category: "documentary",
      label: "DOCUMENTARY",
      image: "photos/tom-ogalo-152.jpg",
      alt: "Man in a blue shirt looking at his phone outdoors"
    },
    {
      title: "Meet the player",
      category: "portraits",
      label: "SPORT PORTRAIT",
      image: "photos/tom-ogalo-184.jpg",
      alt: "Rugby player holding a ball for a portrait"
    },
    {
      title: "A little joy",
      category: "portraits",
      label: "PORTRAIT",
      image: "photos/tom-ogalo-228.jpg",
      alt: "Woman smiling and making a heart shape with her arms"
    },
    {
      title: "Growing together",
      category: "documentary",
      label: "COMMUNITY",
      image: "photos/tom-ogalo-237.jpg",
      alt: "Person tending to young green plants in a garden"
    },
    {
      title: "The whole squad",
      category: "events",
      label: "SPORT",
      image: "photos/tom-ogalo-241.jpg",
      alt: "Women's rugby team posing together on a field"
    },
    {
      title: "In conversation",
      category: "documentary",
      label: "COMMUNITY",
      image: "photos/tom-ogalo-272.jpg",
      alt: "Three friends sharing a conversation outdoors"
    },
    {
      title: "Stories shared",
      category: "documentary",
      label: "COMMUNITY",
      image: "photos/tom-ogalo-338.jpg",
      alt: "Four men talking together outside a brick building"
    },
    {
      title: "A moment to focus",
      category: "film",
      label: "BEHIND THE SCENES",
      image: "photos/tom-5847.jpg",
      alt: "Photographer working on a laptop at a table"
    },
    {
      title: "Listening to the room",
      category: "documentary",
      label: "NON-PROFIT",
      image: "photos/tom-5941.jpg",
      alt: "Woman speaking at a community meeting"
    },
    {
      title: "A neighborhood landmark",
      category: "brands",
      label: "COMMERCIAL",
      image: "photos/tom-2.jpg",
      alt: "Street view of a cafe and market building"
    },
    {
      title: "Along the high street",
      category: "brands",
      label: "COMMERCIAL",
      image: "photos/tom-32.jpg",
      alt: "Shops and businesses along a city street"
    },
    {
      title: "Wildlife in the shade",
      category: "nature",
      label: "WILDLIFE",
      image: "photos/lakeside-207.jpg",
      alt: "Two vervet monkeys resting on a sunlit rock"
    },
    {
      title: "Looking out",
      category: "nature",
      label: "OUTDOORS",
      image: "photos/lakeside-341.jpg",
      alt: "Traveler looking out across a rocky landscape"
    },
    {
      title: "A day on the trail",
      category: "documentary",
      label: "OUTDOOR STORIES",
      image: "photos/lakeside-343.jpg",
      alt: "Two women taking a break during a walk in the woods"
    },
    {
      title: "Portrait among the leaves",
      category: "portraits",
      label: "PORTRAIT",
      image: "photos/ogalo-japicha-42.jpg",
      alt: "Young person wearing sunglasses among green leaves"
    },
    {
      title: "On assignment",
      category: "film",
      label: "BEHIND THE SCENES",
      image: "photos/tom-ogalo-170.jpg",
      alt: "Phone recording video outdoors"
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
  const allWorkCount = document.querySelector('[data-filter="all"] span');
  allWorkCount.textContent = String(siteContent.portfolio.length).padStart(2, "0");
  grid.replaceChildren(...visibleProjects.map((project, index) => {
    const button = document.createElement("button");
    button.className = "portfolio-card";
    button.type = "button";
    button.setAttribute("aria-label", `View ${project.title}, ${project.label.toLowerCase()}`);

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
