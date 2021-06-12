import anime from "animejs";
import Splitter from "./splitText";

class Controller {
    constructor() {
        this.navButtons = [...document.querySelectorAll(".menu-button")];
        this.init();
    }

    init() {
        this.onLoadAnimations();
    }

    onLoadAnimations() {
        const headerLetters = new Splitter(document.querySelector(".splash-header"));

        const splashAnimationsTimeline = anime.timeline();
        // splashAnimationsTimeline.add({
        //     targets: ".morph__svg",
        //     opacity: [0, 1],
        //     duration: 1000,
        //     easing: "easeInQuad",
        // });
        splashAnimationsTimeline.add({
            targets: ".image-icon",
            opacity: [0, 1],
            translateY: [30, 0],
        });
        splashAnimationsTimeline.add({
            targets: headerLetters.chars,
            translateY: [30, 0],
            opacity: [0, 1],
            rotate: [3, 0],
            delay: anime.stagger(40),
            easing: "easeInQuad",
        });
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
        splashAnimationsTimeline.add(
            {
                targets: this.navButtons,
                opacity: [0, 1],
                delay: anime.stagger(40),
                duration: 1000,
            },
            "-=800"
        );
    }
}

new Controller();
