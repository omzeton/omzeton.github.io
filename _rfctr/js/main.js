import anime from "animejs";
import shapes from "./SVGShapesData";
import "../scss/index.scss";
class Controller {
    constructor() {
        this.splashHeader = document.querySelector(".splash__header");
        this.sections = [...document.querySelectorAll("section")];
        this.svg = document.querySelector(".morph__svg");
        this.svgPath = this.svg.querySelector(".morph__path");
        this.wordStaggerAnimation();
        this.svgMorphAnimation({ index: 0 });
    }
    wordStaggerAnimation() {
        this.splashHeader.innerHTML = this.splashHeader.innerText
            .split("")
            .map(letter => `<span>${letter}</span>`)
            .join("");
        anime({
            targets: [...this.splashHeader.querySelectorAll("span")].reverse(),
            easing: "linear",
            duration: 200,
            opacity: 0,
            translateY: 100,
            direction: "reverse",
            delay: anime.stagger(80, { easing: "easeOutQuad" }),
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
