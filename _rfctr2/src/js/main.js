import anime from "animejs";
import scrollMonitor from "scrollmonitor";
import Splitter from "./splitText";
import shapes from "./SVGShapesData";

class Controller {
    constructor() {
        this.sections = [...document.querySelectorAll("section")];
        this.navButtons = [...document.querySelectorAll(".splash__menu-tab")];
        this.footer = document.querySelector("footer");
        this.init();
    }

    init() {
        this.onLoadAnimations();
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

    initSVGMorphingLoop(pos = 0) {
        console.log("initSVGMorphingLoop");
        anime.remove(this.svg);
        anime({
            targets: this.svg,
            duration: 1,
            easing: "linear",
            scaleX: shapes[pos].scaleX,
            scaleY: shapes[pos].scaleY,
            translateX: shapes[pos].tx + "px",
            translateY: shapes[pos].ty + "px",
            rotate: shapes[pos].rotate + "deg",
        });
        this.morphingLoop();
    }

    morphingLoop(pos = 0) {
        anime.remove(this.svgPath);
        anime({
            targets: this.svgPath,
            easing: "linear",
            d: [
                { value: shapes[pos].pathAlt, duration: 3500 },
                { value: shapes[pos].path, duration: 3500 },
            ],
            loop: true,
            fill: {
                value: shapes[pos].fill.color,
                duration: shapes[pos].fill.duration,
                easing: shapes[pos].fill.easing,
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

    createScrollWatchers() {
        let step;
        this.sections.forEach((_, pos = 0) => {
            const scrollElemToWatch = pos ? this.sections[pos] : this.footer;
            pos = pos ? pos : this.sections.length;
            const watcher = scrollMonitor.create(scrollElemToWatch, -300);

            watcher.enterViewport(() => {
                console.log({ pos, shapes });
                step = pos;
                anime.remove(this.svgPath);
                anime({
                    targets: this.svgPath,
                    duration: shapes[pos].animation.path.duration,
                    easing: shapes[pos].animation.path.easing,
                    elasticity: shapes[pos].animation.path.elasticity || 0,
                    d: shapes[pos].path,
                    fill: {
                        value: shapes[pos].fill.color,
                        duration: shapes[pos].fill.duration,
                        easing: shapes[pos].fill.easing,
                    },
                    complete: () => {
                        this.morphingLoop(pos);
                    },
                });

                anime.remove(this.svg);
                anime({
                    targets: this.svg,
                    duration: shapes[pos].animation.svg.duration,
                    easing: shapes[pos].animation.svg.easing,
                    elasticity: shapes[pos].animation.svg.elasticity || 0,
                    scaleX: shapes[pos].scaleX,
                    scaleY: shapes[pos].scaleY,
                    translateX: shapes[pos].tx + "px",
                    translateY: shapes[pos].ty + "px",
                    rotate: shapes[pos].rotate + "deg",
                });
            });

            watcher.exitViewport(() => {
                const idx = !watcher.isAboveViewport ? pos - 1 : pos + 1;

                if (idx <= this.sections.length && step !== idx) {
                    step = idx;
                    anime.remove(this.svgPath);
                    anime({
                        targets: this.svgPath,
                        duration: shapes[idx].animation.path.duration,
                        easing: shapes[idx].animation.path.easing,
                        elasticity: shapes[idx].animation.path.elasticity || 0,
                        d: shapes[idx].path,
                        fill: {
                            value: shapes[idx].fill.color,
                            duration: shapes[idx].fill.duration,
                            easing: shapes[idx].fill.easing,
                        },
                        complete: () => {
                            this.morphingLoop(idx);
                        },
                    });

                    anime.remove(this.svg);
                    anime({
                        targets: this.svg,
                        duration: shapes[idx].animation.svg.duration,
                        easing: shapes[idx].animation.svg.easing,
                        elasticity: shapes[idx].animation.svg.elasticity || 0,
                        scaleX: shapes[idx].scaleX,
                        scaleY: shapes[idx].scaleY,
                        translateX: shapes[idx].tx + "px",
                        translateY: shapes[idx].ty + "px",
                        rotate: shapes[idx].rotate + "deg",
                    });
                }
            });
        });
    }
}

new Controller();
