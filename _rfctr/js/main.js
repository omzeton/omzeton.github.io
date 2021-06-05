// @ts-ignore
import gsap from "gsap";
import anime from "animejs";
import shapes from "./SVGShapesData";
import "../scss/index.scss";
/*
    - Splash text stagger
    - Fix SVG animation
*/
class Controller {
    constructor() {
        this.sections = [...document.querySelectorAll("section")];
        this.svg = document.querySelector(".morph__svg");
        this.svgPath = this.svg.querySelector(".morph__path");
        this.splashAnimations();
        this.svgMorphAnimation({ index: 0 });
    }
    splashAnimations() {
        // @ts-ignore
        const splitTextTest = new SplitText(document.querySelector(".splash__header"), { type: "chars" });
        const timeline = gsap.timeline();
        timeline.from(splitTextTest.chars, { y: 20, opacity: 0, stagger: 0.04 });
        timeline.from(".splash__span", {
            opacity: 0,
            y: 10,
            stagger: 0.1,
            onComplete: () => {
                document.querySelector(".splash__underline")?.classList.add("splash__underline--active");
            },
        });
    }
    svgMorphAnimation({ index }) {
        anime({
            targets: this.svg,
            duration: 1,
            easing: "linear",
            scaleX: shapes[0].scaleX,
            scaleY: shapes[0].scaleY,
            translateX: shapes[0].tx + "px",
            translateY: shapes[0].ty + "px",
            rotate: shapes[0].rotate + "deg",
        });
        anime({
            targets: this.svgPath,
            easing: "linear",
            d: [
                { value: shapes[index].pathAlt, duration: 3500 },
                { value: shapes[index].path, duration: 3500 },
            ],
            loop: true,
            fill: {
                value: shapes[index].fill.color,
                duration: shapes[index].fill.duration,
                easing: shapes[index].fill.easing,
            },
            direction: "alternate",
        });
    }
}
new Controller();
