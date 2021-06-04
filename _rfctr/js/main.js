import anime from "animejs";
import shapes from "./SVGShapesData";
import "../scss/index.scss";
class Controller {
    constructor() {
        this.sections = [...document.querySelectorAll("section")];
        this.svg = document.querySelector(".morph__svg");
        this.svgPath = this.svg.querySelector(".morph__path");
        this.svgMorphAnimation({ index: 0 });
    }
    svgMorphAnimation({ index }) {
        anime({
            targets: this.svg,
            duration: 1,
            scaleX: shapes[0].scaleX,
            scaleY: shapes[0].scaleY,
            translateX: shapes[0].tx + "px",
            translateY: shapes[0].ty + "px",
            rotate: shapes[0].rotate + "deg",
        });
        anime({
            targets: this.svgPath,
            easing: "linear",
            loop: true,
            fill: shapes[index].fill.color,
            direction: "alternate",
            d: [
                { value: shapes[index].pathAlt, duration: 3500 },
                { value: shapes[index].path, duration: 3500 },
            ],
        });
    }
}
new Controller();
