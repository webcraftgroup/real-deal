// Get all sidebar links
const links = document.querySelectorAll(".side-link");

// Change the active link when clicked
links.forEach(link => {
    link.addEventListener("click", function() {

        // Remove active class from all links
        links.forEach(item => {
            item.classList.remove("active");
            item.removeAttribute("aria-current");
        });

        // Highlight the clicked link
        this.classList.add("active");
        this.setAttribute("aria-current", "location");

    });
});
