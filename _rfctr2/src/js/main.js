import anime from "animejs";
import Splitter from "./splitText";

const colors = ["#ff3434", "#ffd034", "#8067ee", "#34ff82"];

class Controller {
    constructor() {
        this.isMobile = window.screen.width < 1024;
        this.observer = null;
        this.svgTimeline = null;
        this.sections = [...document.querySelectorAll("section")];
        this.navButtons = [...document.querySelectorAll(".splash__menu-tab")];
        this.navigation();
        this.updateCopyrightDate();
        this.splashAnimations();
        this.morphToNewShape();
        this.progressBar();
    }

    navigation() {
        this.navButtons.forEach(button => {
            button.addEventListener("click", event => {
                event.preventDefault();
                const targetPosition = this.sections.find(section => {
                    if (section.dataset.morph === button.dataset.navTo) {
                        return section;
                    }
                });
                window.scrollTo({
                    top: targetPosition.offsetTop,
                    behavior: "smooth",
                });
            });
        });
    }

    updateCopyrightDate() {
        const date = new Date();
        const year = date.getFullYear();
        document.getElementById("copyright-date").innerText = `${year}`;
    }

    splashAnimations() {
        const headerLetters = new Splitter(document.querySelector(".splash__header"));

        const splashAnimationsTimeline = anime.timeline();
        splashAnimationsTimeline.add({
            targets: ".morph__svg",
            opacity: [0, 1],
            duration: 1000,
            easing: "easeInQuad",
        });
        splashAnimationsTimeline.add({
            targets: headerLetters.chars,
            translateY: [20, 0],
            opacity: [0, 1],
            rotate: [3, 0],
            delay: anime.stagger(40),
            duration: 1000,
            easing: "spring(1, 80, 10, 0)",
        });
        splashAnimationsTimeline.add({
            targets: ".splash__subtext",
            translateY: [10, 0],
            opacity: [0, 1],
            delay: anime.stagger(100),
            easing: "easeOutCubic",
            complete() {
                document.querySelector(".splash__line").classList.add("splash__line--active");
            },
        });
        splashAnimationsTimeline.add({
            targets: ".splash__menu-tab",
            opacity: [0, 1],
            duration: 1000,
        });
    }

    morphToNewShape() {
        // const morphingTimeline = gsap.timeline({ repeat: -1 });
        // morphingTimeline.to(".morph__path", { morphSVG: "#second", duration: 2, ease: "linear" });
        // morphingTimeline.to(".morph__path", { morphSVG: "#first", duration: 2, ease: "linear" });
    }

    progressBar() {
        const progressBar = document.getElementById("progressBar");
        const updateProgress = () => {
            let scrollTop = window.pageYOffset,
                pageHeight =
                    Math.max(
                        document.body.scrollHeight,
                        document.body.offsetHeight,
                        document.documentElement.clientHeight,
                        document.documentElement.scrollHeight,
                        document.documentElement.offsetHeight
                    ) - document.documentElement.clientHeight,
                amountScrolled = pageHeight - scrollTop,
                percentage = Math.floor((amountScrolled / pageHeight) * 100);
            percentage = 100 - percentage;
            progressBar.style.height = `${percentage}%`;
        };
        updateProgress();
        window.addEventListener("scroll", () => {
            updateProgress();
        });
    }
}

new Controller();
