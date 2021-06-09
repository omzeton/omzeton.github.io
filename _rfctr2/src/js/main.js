import anime from "animejs";
import Splitter from "./splitText";
import shapes from "./SVGShapesData";

class Controller {
    constructor() {
        this.sections = [...document.querySelectorAll("section")];
        this.navButtons = [...document.querySelectorAll(".splash__menu-tab")];
        this.svg = document.querySelector(".morph__svg");
        this.svgPath = document.querySelector(".morph__path");
        this.init();
    }

    init() {
        this.onLoadAnimations();
        this.initSVGMorphingLoop();
        this.setProgressBarListener();
        this.startIntersectionObserver();
    }

    onLoadAnimations() {
        const headerLetters = new Splitter(document.querySelector(".splash-header"));

        const splashAnimationsTimeline = anime.timeline();
        splashAnimationsTimeline.add({
            targets: ".morph__svg",
            opacity: [0, 1],
            duration: 1000,
            easing: "easeInQuad",
        });
        splashAnimationsTimeline.add(
            {
                targets: headerLetters.chars,
                translateY: [20, 0],
                opacity: [0, 1],
                rotate: [3, 0],
                delay: anime.stagger(40),
                easing: "easeInOutCirc",
            },
            "-=400"
        );
        splashAnimationsTimeline.add(
            {
                targets: ".splash-subtext",
                translateY: [10, 0],
                opacity: [0, 1],
                delay: anime.stagger(100),
                easing: "easeInOutCirc",
                complete() {
                    document.querySelector(".splash-line").classList.add("active-line");
                },
            },
            "-=600"
        );
        splashAnimationsTimeline.add({
            targets: ".splash-menu",
            opacity: [0, 1],
            duration: 1000,
        });
    }

    initSVGMorphingLoop() {
        anime.remove(this.svgPath);
        anime({
            targets: this.svgPath,
            easing: "linear",
            d: [
                { value: shapes[0].pathAlt, duration: 3500 },
                { value: shapes[0].path, duration: 3500 },
            ],
            loop: true,
            fill: {
                value: shapes[0].fill.color,
                duration: shapes[0].fill.duration,
                easing: shapes[0].fill.easing,
            },
            direction: "alternate",
        });
    }

    setProgressBarListener() {
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

    startIntersectionObserver() {}
}

new Controller();
