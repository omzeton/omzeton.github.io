import gsap from "gsap";
import CustomSplitText from "./splitText";

const colors = ["#ff3434", "#ffd034", "#8067ee", "#34ff82"];

class Controller {
    constructor() {
        this.observer = null;
        this.svgTimeline = null;
        this.sections = [...document.querySelectorAll("section")];
        this.navButtons = [...document.querySelectorAll(".splash__menu-tab")];
        gsap.registerPlugin(MorphSVGPlugin);
        this.navigation();
        this.updateCopyrightDate();
        this.splashAnimations();
        this.morphToNewShape();
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
        titleTimeline.from(".splash__span", {
            opacity: 0,
            y: 10,
            stagger: 0.1,
            onComplete: () => {
                document.querySelector(".splash__underline").classList.add("splash__underline--active");
            },
        });
    }

    morphToNewShape() {
        this.svgTimeline = gsap.timeline({ repeat: -1, yoyo: true });
        this.svgTimeline.to(".morph__path", { morphSVG: "#first", fill: colors[0], ease: "linear" });
        this.svgTimeline.to(".morph__path", { morphSVG: "#second", fill: colors[0], ease: "linear" });
    }
}

new Controller();
