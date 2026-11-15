

document.documentElement.classList.add("js-ready");


/*
   2. CABEÇALHO
 */

const header = document.querySelector(".header");

function updateHeader() {
    if (!header) return;

    header.classList.toggle("scrolled", window.scrollY > 40);
}

window.addEventListener("scroll", updateHeader, {
    passive: true
});

updateHeader();


/* 
   3. MENU MOBILE
 */

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");
const navigationLinks = document.querySelectorAll(
    ".navigation a"
);

function closeMenu() {
    if (!menuToggle || !navigation) return;

    navigation.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");

    document.body.classList.remove("menu-open");
}

if (menuToggle && navigation) {

    menuToggle.addEventListener("click", () => {

        const isOpen = menuToggle.getAttribute(
            "aria-expanded"
        ) === "true";

        if (isOpen) {
            closeMenu();
        } else {

            navigation.classList.add("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Fechar menu"
            );

            document.body.classList.add("menu-open");

        }

    });


    navigationLinks.forEach(link => {

        link.addEventListener("click", closeMenu);

    });


    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });


    window.addEventListener("resize", () => {

        if (window.innerWidth > 760) {
            closeMenu();
        }

    });

}


/* 
   4. CARROSSEL PRINCIPAL
 */

const hero = document.querySelector(".hero");

const slides = document.querySelectorAll(
    ".hero-slide"
);

const indicators = document.querySelectorAll(
    ".carousel-indicator"
);

const previousButton = document.querySelector(
    ".carousel-prev"
);

const nextButton = document.querySelector(
    ".carousel-next"
);

let currentSlide = 0;
let carouselTimer = null;

const carouselInterval = 6000;


function showSlide(index) {

    if (!slides.length) return;

    currentSlide = (
        index + slides.length
    ) % slides.length;


    slides.forEach((slide, position) => {

    const isActive = position === currentSlide;

    slide.classList.toggle("active", isActive);

    slide.setAttribute(
        "aria-hidden",
        String(!isActive)
    );

    const video = slide.querySelector("video");

    if (video) {

        if (isActive) {

            video.currentTime = 0;

            video.play().catch(() => {
                // O navegador pode bloquear a reproducao.
            });

        } else {

            video.pause();
            video.currentTime = 0;

        }

    }

});

    indicators.forEach((indicator, position) => {

        const isActive = position === currentSlide;

        indicator.classList.toggle(
            "active",
            isActive
        );

        if (isActive) {

            indicator.setAttribute(
                "aria-current",
                "true"
            );

        } else {

            indicator.removeAttribute(
                "aria-current"
            );

        }

    });

}


function stopCarousel() {

    if (carouselTimer !== null) {

        clearInterval(carouselTimer);

        carouselTimer = null;

    }

}


function startCarousel() {

    stopCarousel();

    if (
        slides.length < 2 ||
        document.hidden
    ) {
        return;
    }

    carouselTimer = setInterval(() => {

        if (
            hero &&
            !hero.matches(":hover") &&
            !hero.contains(document.activeElement)
        ) {

            showSlide(currentSlide + 1);

        }

    }, carouselInterval);

}


function restartCarousel() {

    stopCarousel();

    startCarousel();

}


if (slides.length > 0) {

    showSlide(0);

    startCarousel();


    if (nextButton) {

        nextButton.addEventListener("click", () => {

            showSlide(currentSlide + 1);

            restartCarousel();

        });

    }


    if (previousButton) {

        previousButton.addEventListener("click", () => {

            showSlide(currentSlide - 1);

            restartCarousel();

        });

    }


    indicators.forEach((indicator, index) => {

        indicator.addEventListener("click", () => {

            showSlide(index);

            restartCarousel();

        });

    });


    if (hero) {

        hero.addEventListener("mouseenter", stopCarousel);

        hero.addEventListener("mouseleave", startCarousel);

        hero.addEventListener("focusin", stopCarousel);

        hero.addEventListener("focusout", () => {

            if (!hero.contains(document.activeElement)) {
                startCarousel();
            }

        });

    }


    document.addEventListener("visibilitychange", () => {

        if (document.hidden) {

            stopCarousel();

        } else {

            startCarousel();

        }

    });

}


/* 
   5. GALERIA AMPLIADA / LIGHTBOX
 */

const galleryItems = Array.from(
    document.querySelectorAll(".gallery-item")
);

const lightbox = document.querySelector(".lightbox");

const lightboxImage = document.querySelector(
    ".lightbox-image"
);

const lightboxClose = document.querySelector(
    ".lightbox-close"
);

const lightboxPrevious = document.querySelector(
    ".lightbox-prev"
);

const lightboxNext = document.querySelector(
    ".lightbox-next"
);

const lightboxCounter = document.querySelector(
    ".lightbox-counter"
);

let currentGalleryIndex = 0;
let previousFocusedElement = null;


function updateLightbox() {

    if (
        !lightboxImage ||
        galleryItems.length === 0
    ) {
        return;
    }

    const item = galleryItems[currentGalleryIndex];

    const image = item.querySelector("img");

    if (!image) return;

    lightboxImage.src = item.dataset.full || image.src;

    lightboxImage.alt = item.dataset.alt || image.alt;


    if (lightboxCounter) {

        lightboxCounter.textContent =
            `${currentGalleryIndex + 1} / ${galleryItems.length}`;

    }


    if (lightboxPrevious) {

        lightboxPrevious.disabled =
            galleryItems.length < 2;

    }


    if (lightboxNext) {

        lightboxNext.disabled =
            galleryItems.length < 2;

    }

}


function openLightbox(index) {

    if (
        !lightbox ||
        galleryItems.length === 0
    ) {
        return;
    }

    currentGalleryIndex = index;

    previousFocusedElement = document.activeElement;

    updateLightbox();

    if (typeof lightbox.showModal === "function") {

        lightbox.showModal();

    } else {

        lightbox.setAttribute("open", "");

    }

    document.body.classList.add("lightbox-open");

    if (lightboxClose) {
        lightboxClose.focus();
    }

}


function closeLightbox() {

    if (!lightbox) return;

    if (typeof lightbox.close === "function") {

        if (lightbox.open) {
            lightbox.close();
        }

    } else {

        lightbox.removeAttribute("open");

    }

    document.body.classList.remove("lightbox-open");

    if (
        previousFocusedElement &&
        typeof previousFocusedElement.focus === "function"
    ) {

        previousFocusedElement.focus();

    }

}


function changeGalleryImage(direction) {

    if (galleryItems.length < 2) return;

    currentGalleryIndex = (
        currentGalleryIndex + direction + galleryItems.length
    ) % galleryItems.length;

    updateLightbox();

}


galleryItems.forEach((item, index) => {

    item.addEventListener("click", () => {

        openLightbox(index);

    });

});


if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );

}


if (lightboxPrevious) {

    lightboxPrevious.addEventListener("click", () => {

        changeGalleryImage(-1);

    });

}


if (lightboxNext) {

    lightboxNext.addEventListener("click", () => {

        changeGalleryImage(1);

    });

}


/* Fecha ao clicar fora da fotografia */

if (lightbox) {

    lightbox.addEventListener("click", event => {

        if (event.target === lightbox) {

            closeLightbox();

        }

    });


    lightbox.addEventListener("close", () => {

        document.body.classList.remove("lightbox-open");

    });

}


/* Navegação pelo teclado */

document.addEventListener("keydown", event => {

    if (!lightbox || !lightbox.open) return;

    if (event.key === "ArrowRight") {

        changeGalleryImage(1);

    } else if (event.key === "ArrowLeft") {

        changeGalleryImage(-1);

    }

});


/* 
   6. ANIMAÇÕES AO ROLAR A PÁGINA
 */

const revealElements = document.querySelectorAll(
    ".about-content, .about-image, .about-note, " +
    ".section-heading, .space-item, .gallery-intro, " +
    ".gallery-item, .information-item, .contact-title"
);


if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach(element => {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach(element => {

        element.classList.add("is-visible");

    });

}


/* 
   7. ANO AUTOMÁTICO NO RODAPÉ
 */

const currentYear = document.querySelector(
    "#current-year"
);

if (currentYear) {

    currentYear.textContent = new Date().getFullYear();

}


