// @ts-ignore
import gsap from "gsap";
import "../scss/index.scss";

class Controller {
    sections: HTMLElement[];
    constructor() {
        this.sections = [...document.querySelectorAll("section")!];
        this.updateCopyrightDate();
        this.splashAnimations();
        this.svgMorphAnimation();
        // @ts-ignore
        gsap.registerPlugin(MorphSVGPlugin);
    }

    updateCopyrightDate() {
        const date = new Date();
        const year = date.getFullYear();
        document.getElementById("copyright-date")!.innerText = `${year}`;
    }

    splashAnimations() {
        const menuTimeline = gsap.timeline();
        menuTimeline.from(
            ".splash__logo",
            {
                opacity: 0,
                onComplete: () => {
                    document.querySelector(".splash__logo")!.classList.add("splash__logo--active");
                },
            },
            "+=1"
        );
        // @ts-ignore
        const splitTextTest = new SplitText(document.querySelector(".splash__header"), { type: "chars" });
        const titleTimeline = gsap.timeline();
        titleTimeline.from(".morph__svg", { opacity: 0 });
        titleTimeline.from(splitTextTest.chars, { y: 20, opacity: 0, rotation: 3, force3D: true, stagger: 0.04 });
        titleTimeline.from(".splash__span", {
            opacity: 0,
            y: 10,
            stagger: 0.1,
            onComplete: () => {
                document.querySelector(".splash__underline")!.classList.add("splash__underline--active");
            },
        });
    }

    svgMorphAnimation() {
        const morphingTimeline = gsap.timeline({ repeat: -1 });
        morphingTimeline.to(".morph__path", { morphSVG: "#second", duration: 2, ease: "linear" });
        morphingTimeline.to(".morph__path", { morphSVG: "#first", duration: 2, ease: "linear" });
    }
}

new Controller();
