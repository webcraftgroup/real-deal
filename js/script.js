// Product information is kept together here so it is easy to update later.
const products = {
  late: { name: "Don’t Be Late Tee", image: "assets/dont-be-late-tee.png", alt: "Don't Be Late graphic tee" },
  comfort: { name: "Everyday Comfort Tee", image: "assets/everyday-comfort-tee.png", alt: "Everyday Comfort graphic tee" },
  "good-work": { name: "Do Good Work Tee", image: "assets/do-good-work-tee.png", alt: "Do Good Work graphic tee" }
};

const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const productDialog = document.querySelector(".product-dialog");
const sizeSelect = document.querySelector("#size-select");
const bagMessage = document.querySelector(".bag-message");
const toast = document.querySelector(".toast");
let lastProductButton = null;
let toastTimer;

// Expand/collapse the navigation on small screens.
menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  navLinks.classList.toggle("is-open", !isOpen);
});

navLinks.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    navLinks.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  }
});

// Fill in and open the same accessible detail window for each tee.
document.querySelectorAll(".product-card").forEach((card) => {
  const openButtons = card.querySelectorAll(".product-open, .product-image-button");
  openButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const product = products[card.dataset.product];
      lastProductButton = button;
      document.querySelector("#dialog-title").textContent = product.name;
      const image = document.querySelector("#dialog-image");
      image.src = product.image;
      image.alt = product.alt;
      sizeSelect.value = "";
      bagMessage.textContent = "";
      productDialog.showModal();
    });
  });
});

function closeProductDialog() {
  productDialog.close();
  if (lastProductButton) lastProductButton.focus();
}

document.querySelector(".dialog-close").addEventListener("click", closeProductDialog);
productDialog.addEventListener("click", (event) => {
  if (event.target === productDialog) closeProductDialog();
});

// This demo bag interaction confirms the selected tee and size on this page.
document.querySelector(".add-to-bag").addEventListener("click", () => {
  if (!sizeSelect.value) {
    bagMessage.textContent = "Please choose a size first.";
    sizeSelect.focus();
    return;
  }

  bagMessage.textContent = `${document.querySelector("#dialog-title").textContent} (size ${sizeSelect.value}) added to your bag.`;
  toast.textContent = "Added to your bag!";
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2400);
});

// Keep the copyright year current.
document.querySelector("#year").textContent = new Date().getFullYear();
