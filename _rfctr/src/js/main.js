import gsap from "gsap";
import CustomSplitText from "./splitText";

const colors = ["#FFC61A", "#663399", "#ffd034", "#34ff82"];

class Controller {
    constructor() {
        this.observer = null;
        this.svgTimeline = null;
        this.sections = [...document.querySelectorAll("section")];
        gsap.registerPlugin(MorphSVGPlugin);
        this.updateCopyrightDate();
        this.splashAnimations();
        this.createIntersectionObserver();
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

    morphToNewShape(id) {
        let shape = {};
        switch (id) {
            case "splash":
                shape.color = colors[0];
                shape.first = "#first";
                shape.second = "#second";
                break;
            case "experience":
                shape.color = colors[1];
                shape.first = "#third";
                shape.second = "#fourth";
                break;
        }
        if (this.svgTimeline) this.svgTimeline = null;
        this.svgTimeline = gsap.timeline({ repeat: -1, yoyo: true });
        this.svgTimeline.to(".morph__path", { morphSVG: shape.first, fill: shape.color, duration: 1, ease: "linear" });
        this.svgTimeline.to(".morph__path", { morphSVG: shape.second, fill: shape.color, duration: 1, ease: "linear" });
    }

    createIntersectionObserver() {
        this.observer = new IntersectionObserver(elements => {
            if (elements[0].intersectionRatio !== 0) {
                this.morphToNewShape(elements[0].target.dataset.morph);
            }
        });
        this.sections.forEach(section => {
            this.observer.observe(section);
        });
    }
}

new Controller();
