const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const scrollTopButton = document.querySelector(".scroll-top");
const audioToggle = document.querySelector(".audio-toggle");
const backgroundAudio = document.querySelector("#backgroundAudio");
const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-links a");

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navItems.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.16 });

document.querySelectorAll(".reveal").forEach((element) => {
    revealObserver.observe(element);
});

const countObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            return;
        }

        const element = entry.target;
        const target = Number(element.dataset.count);
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 40));

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
                return;
            }
            element.textContent = current;
        }, 28);

        countObserver.unobserve(element);
    });
}, { threshold: 0.5 });

document.querySelectorAll("[data-count]").forEach((element) => {
    countObserver.observe(element);
});

function updateNavigation() {
    const scrollPosition = window.scrollY + 120;

    sections.forEach((section) => {
        const id = section.getAttribute("id");
        const navItem = document.querySelector(`.nav-links a[href="#${id}"]`);
        const isActive = scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight;

        if (navItem) {
            navItem.classList.toggle("active", isActive);
        }
    });

    scrollTopButton.classList.toggle("visible", window.scrollY > 420);
}

window.addEventListener("scroll", updateNavigation);
window.addEventListener("load", updateNavigation);

scrollTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

if (audioToggle && backgroundAudio) {
    backgroundAudio.volume = 0.18;

    audioToggle.addEventListener("click", async () => {
        const icon = audioToggle.querySelector("i");

        if (backgroundAudio.paused) {
            try {
                await backgroundAudio.play();
                audioToggle.classList.add("is-playing");
                audioToggle.setAttribute("aria-pressed", "true");
                audioToggle.setAttribute("aria-label", "Pausar som ambiente");
                if (icon) {
                    icon.className = "fa-solid fa-volume-low";
                }
            } catch {
                audioToggle.setAttribute("aria-label", "Não foi possível iniciar o som");
            }
            return;
        }

        backgroundAudio.pause();
        audioToggle.classList.remove("is-playing");
        audioToggle.setAttribute("aria-pressed", "false");
        audioToggle.setAttribute("aria-label", "Ativar som ambiente");
        if (icon) {
            icon.className = "fa-solid fa-volume-xmark";
        }
    });
}
