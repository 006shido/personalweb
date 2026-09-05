/* =========================================================
   TYPING ANIMATION
========================================================= */

const typingElement = document.getElementById("typing");

const words = [
    "Tech Enthusiast",
    "Cybersecurity Learner",
    "Programmer",
    "Web Developer",
    "Ethical Hacker"
];

let wordIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {

    const currentWord = words[wordIndex];

    if (!deleting) {

        typingElement.textContent =
            currentWord.substring(0, characterIndex + 1);

        characterIndex++;

        if (characterIndex === currentWord.length) {

            deleting = true;

            setTimeout(typeEffect, 1500);

            return;
        }

    } else {

        typingElement.textContent =
            currentWord.substring(0, characterIndex - 1);

        characterIndex--;

        if (characterIndex === 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex >= words.length) {
                wordIndex = 0;
            }
        }
    }

    setTimeout(
        typeEffect,
        deleting ? 60 : 100
    );
}


/* Start typing */

typeEffect();


/* =========================================================
   SECTION SCROLL ANIMATION
========================================================= */

const sections =
    document.querySelectorAll(".placeholder-section");

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },
    {
        threshold: 0.2
    }
);

sections.forEach((section) => {
    observer.observe(section);
});


/* =========================================================
   MOBILE MENU TOGGLE
========================================================= */

const menuIcon = document.getElementById("menu-icon");
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".navbar a");

function toggleMenu() {
    navbar.classList.toggle("active");
    const icon = menuIcon.querySelector("i");
    if (icon) {
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-xmark");
    }
}

function closeMenu() {
    navbar.classList.remove("active");
    const icon = menuIcon.querySelector("i");
    if (icon) {
        icon.classList.add("fa-bars");
        icon.classList.remove("fa-xmark");
    }
}

if (menuIcon && navbar) {
    menuIcon.addEventListener("click", toggleMenu);

    // Keyboard accessibility for menu icon
    menuIcon.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleMenu();
        }
    });

    // Close menu when clicking nav links
    navLinks.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
        if (!navbar.contains(e.target) && !menuIcon.contains(e.target)) {
            closeMenu();
        }
    });
}


/* =========================================================
   SCROLLSPY & HEADER SCROLL EFFECT
========================================================= */

const header = document.querySelector(".header");
const allSections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    // Header background elevation on scroll
    if (header) {
        if (scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    // Check if scrolled near the bottom of the page (to highlight Contact)
    const reachedBottom = (window.innerHeight + Math.ceil(scrollY)) >= (document.documentElement.scrollHeight - 60);

    if (reachedBottom) {
        navLinks.forEach((link) => link.classList.remove("active"));
        const contactLink = document.querySelector('.navbar a[href="#contact"]');
        if (contactLink) contactLink.classList.add("active");
        return;
    }

    // Highlight current visible section
    allSections.forEach((section) => {
        const sectionTop = section.offsetTop - 140;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach((link) => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${sectionId}`) {
                    link.classList.add("active");
                }
            });
        }
    });
});