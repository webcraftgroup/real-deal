/* Contact Us page */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        const isOpen = navLinks.classList.toggle("is-open");
        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });
}

const contactForm = document.getElementById("contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();
        
        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        const fullName = document.getElementById("full-name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("topic").value.trim();
        const message = document.getElementById("message").value.trim();

        const emailBody = 
            "Name: " + fullName + "\n" +
            "Email: " + email + "\n\n" +
            "Message:\n" + message;
        
        const recipient = "hello@examplewebsite142.com";

        const mailtoLink =
            "mailto:" + recipient +
            "?subject=" + encodeURIComponent (subject) +
            "&body=" + encodeURIComponent (emailBody);

        window.location.href = mailtoLink;
    });
}

const yearElement = document.getElementById("year");
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();        
}