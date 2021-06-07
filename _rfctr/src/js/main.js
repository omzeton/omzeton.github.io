import gsap from "gsap";
import CustomSplitText from "./splitText";

const colors = ["#ff3434", "#ffd034", "#8067ee", "#34ff82"];

class Controller {
    constructor() {
        this.isMobile = window.screen.width < 1024;
        this.observer = null;
        this.svgTimeline = null;
        this.sections = [...document.querySelectorAll("section")];
        this.navButtons = [...document.querySelectorAll(".splash__menu-tab")];
        gsap.registerPlugin(MorphSVGPlugin);
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
        const menuTimeline = gsap.timeline();
        menuTimeline.from(
            ".splash__menu-tab",
            {
                opacity: 0,
                stagger: 0.1,
                delay: 1.5,
            },
            "+=1"
        );
        const splitHeader = new CustomSplitText(document.querySelector(".splash__header"));
        const titleTimeline = gsap.timeline();
        titleTimeline.from(".morph__svg", { opacity: 0 });
        titleTimeline.from(splitHeader.chars, { y: 20, opacity: 0, rotation: 3, force3D: true, stagger: 0.04 });
        titleTimeline.from(".splash__subtext", {
            opacity: 0,
            y: 10,
            stagger: 0.1,
            onComplete: () => {
                document.querySelector(".splash__line").classList.add("splash__line--active");
            },
        });
    }

    morphToNewShape() {
        const morphingTimeline = gsap.timeline({ repeat: -1 });
        morphingTimeline.to(".morph__path", { morphSVG: "#second", duration: 2, ease: "linear" });
        morphingTimeline.to(".morph__path", { morphSVG: "#first", duration: 2, ease: "linear" });
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
