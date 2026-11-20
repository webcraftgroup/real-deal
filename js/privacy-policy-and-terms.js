// Get all policy sections and sidebar links 
const sections = document.querySelectorAll(".policy-section"); 
const links = document.querySelectorAll(".side-link"); 
// Update the active sidebar link 
function setActiveSection(id) { 
links.forEach(link => { 
const isActive = link.getAttribute("href") === `#${id}`; 
link.classList.toggle("active", isActive); 
if (isActive) { 
link.setAttribute("aria-current", "location"); 
    } 
    } 
  }); 
} 
else { 
link.removeAttribute("aria-current"); 
// Detect which section is visible on screen 
const observer = new IntersectionObserver((entries) => { 
const visibleSections = entries 
    .filter(entry => entry.isIntersecting) 
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio); 
if (visibleSections.length > 0) { 
setActiveSection(visibleSections[0].target.id); 
  } 
}, { 
rootMargin: "-15% 0px -65% 0px", 
threshold: [0, 0.1, 0.25, 0.5, 0.75] 
}); 
// Observe all sections 
sections.forEach(section => { 
observer.observe(section); 
}); 
// Highlight clicked sidebar link 
links.forEach(link => { 
link.addEventListener("click", () => { 
const sectionId = link.getAttribute("href").slice(1); 
setActiveSection(sectionId); 
  }); 
});
