const body = document.body;
const html = document.documentElement;
const progress = document.getElementById("progressBar");
const spans = document.getElementsByClassName("Heading--Stagger");
const underline = document.querySelector(".Heading--Underline");
const copyYear = document.getElementById("copyrightYear");
const nav = document.querySelector("nav");
const navSelector = document.getElementById("nav--selector");
const navBtns = Array.from(document.querySelectorAll(".menu__button"));
const navMenu = document.getElementById("nav--menu");
const tl = new TimelineMax();
const DOM = {};
DOM.svg = document.querySelector(".morph");
DOM.svgPath = DOM.svg.querySelector("path");
DOM.contentElems = Array.from(document.querySelectorAll(".content-wrap"));
DOM.footer = document.querySelector(".content--related");
const contentElemsTotal = DOM.contentElems.length;
const colors = ["#ff3434", "#ffd034", "#8067ee", "#34ff82"];

// Copyright year

const date = new Date();
copyYear.innerHTML = date.getFullYear();

// Disappeasing navbar on mobile
function hideNavOnScrollMobile() {
    nav.style.top = window.pageYOffset > 200 ? "-6em" : "2em";
}

// Progress Bar to the right of the screen
function progressBar() {
    let scrollTop = window.pageYOffset,
        pageHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight) - html.clientHeight,
        amountScrolled = pageHeight - scrollTop,
        percentage = Math.floor((amountScrolled / pageHeight) * 100);
    percentage = 100 - percentage;

    progress.style.height = `${percentage}%`;
    return percentage;
}

// TweenMax h2 Animations
tl.staggerTo(
    spans,
    1.5,
    {
        opacity: 1,
        y: 0,
        delay: 0.2,
        ease: Circ.easeOut,
    },
    0.2
);

TweenMax.fromTo(underline, 4, { width: "0px" }, { width: "20%", ease: Expo.easeOut, delay: 2 });

// Morphing SVG in background
//*{
// Plugin taken from Codrops tutorial on Morphing Background Shapes
// https://tympanus.net/codrops/2017/05/23/on-scroll-morphing-background-shapes/
//}*

const shapes = [
    {
        path: "M 247.6,239.6 C 174.3,404.5 245.5,601.9 358.5,624.3 471.5,646.6 569.1,611.6 659.7,655.7 750.4,699.7 1068,687.6 1153,534.4 1237,381.1 1114,328.4 1127,227.4 1140,126.3 1016,51.08 924.6,116.8 833.8,182.5 928.4,393.8 706.8,283.5 485.2,173.1 320.8,74.68 247.6,239.6 Z",
        pathAlt:
            "M 247.6,239.6 C 174.3,404.5 271.3,550.3 358.5,624.3 445.7,698.3 569.1,611.6 659.7,655.7 750.4,699.7 1145,699 1153,534.4 1161,369.8 1114,328.4 1127,227.4 1140,126.3 1016,51.08 924.6,116.8 833.8,182.5 894.5,431 706.8,283.5 519.1,136 320.8,74.68 247.6,239.6 Z",
        scaleX: 1.8,
        scaleY: 1.5,
        rotate: 0,
        tx: 250,
        ty: 50,
        fill: {
            color: colors[0],
            duration: 500,
            easing: "linear",
        },
        animation: {
            path: {
                duration: 3000,
                easing: "easeOutElastic",
                elasticity: 600,
            },
            svg: {
                duration: 2000,
                easing: "easeOutExpo",
            },
        },
    },
    {
        path: "M 262.9,252.2 C 210.1,338.2 212.6,487.6 288.8,553.9 372.2,626.5 511.2,517.8 620.3,536.3 750.6,558.4 860.3,723 987.3,686.5 1089,657.3 1168,534.7 1173,429.2 1178,313.7 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z",
        pathAlt:
            "M 262.9,252.2 C 210.1,338.2 273.3,400.5 298.5,520 323.7,639.6 511.2,537.2 620.3,555.7 750.6,577.8 872.2,707.4 987.3,686.5 1102,665.6 1218,547.8 1173,429.2 1128,310.6 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z",
        scaleX: 1.5,
        scaleY: 1,
        rotate: -20,
        tx: 0,
        ty: -50,
        fill: {
            color: colors[1],
            duration: 500,
            easing: "linear",
        },
        animation: {
            path: {
                duration: 3000,
                easing: "easeOutQuad",
                elasticity: 600,
            },
            svg: {
                duration: 3000,
                easing: "easeOutElastic",
            },
        },
    },
    {
        path: "M 262.9,252.2 C 210.1,338.2 212.6,487.6 288.8,553.9 372.2,626.5 511.2,517.8 620.3,536.3 750.6,558.4 860.3,723 987.3,686.5 1089,657.3 1168,534.7 1173,429.2 1178,313.7 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z",
        pathAlt:
            "M 262.9,252.2 C 210.1,338.2 273.3,400.5 298.5,520 323.7,639.6 511.2,537.2 620.3,555.7 750.6,577.8 872.2,707.4 987.3,686.5 1102,665.6 1218,547.8 1173,429.2 1128,310.6 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z",
        scaleX: 1.2,
        scaleY: 1,
        rotate: 0,
        tx: -30,
        ty: -300,
        fill: {
            color: colors[2],
            duration: 500,
            easing: "linear",
        },
        animation: {
            path: {
                duration: 3000,
                easing: "easeOutElastic",
                elasticity: 600,
            },
            svg: {
                duration: 2000,
                easing: "easeOutElastic",
            },
        },
    },
    {
        path: "M 262.9,252.2 C 210.1,338.2 212.6,487.6 288.8,553.9 372.2,626.5 511.2,517.8 620.3,536.3 750.6,558.4 860.3,723 987.3,686.5 1089,657.3 1168,534.7 1173,429.2 1178,313.7 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z",
        pathAlt:
            "M 262.9,252.2 C 210.1,338.2 273.3,400.5 298.5,520 323.7,639.6 511.2,537.2 620.3,555.7 750.6,577.8 872.2,707.4 987.3,686.5 1102,665.6 1218,547.8 1173,429.2 1128,310.6 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z",
        scaleX: 2.5,
        scaleY: 2,
        rotate: 0,
        tx: 0,
        ty: -50,
        fill: {
            color: colors[3],
            duration: 500,
            easing: "linear",
        },
        animation: {
            path: {
                duration: 3000,
                easing: "easeOutQuad",
                elasticity: 600,
            },
            svg: {
                duration: 3000,
                easing: "easeOutElastic",
            },
        },
    },
];

let step;

const initShapeLoop = function (pos) {
    pos = pos || 0;
    anime.remove(DOM.svgPath);
    anime({
        targets: DOM.svgPath,
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
};

const initsvgPath = function () {
    anime.remove(DOM.svg);
    anime({
        targets: DOM.svg,
        duration: 1,
        easing: "linear",
        scaleX: shapes[0].scaleX,
        scaleY: shapes[0].scaleY,
        translateX: shapes[0].tx + "px",
        translateY: shapes[0].ty + "px",
        rotate: shapes[0].rotate + "deg",
    });

    initShapeLoop();
};

const createScrollWatchers = function () {
    DOM.contentElems.forEach((el, pos) => {
        const scrollElemToWatch = pos ? DOM.contentElems[pos] : DOM.footer;
        pos = pos ? pos : contentElemsTotal;
        const watcher = scrollMonitor.create(scrollElemToWatch, -300);

        watcher.enterViewport(function () {
            step = pos;
            anime.remove(DOM.svgPath);
            anime({
                targets: DOM.svgPath,
                duration: shapes[pos].animation.path.duration,
                easing: shapes[pos].animation.path.easing,
                elasticity: shapes[pos].animation.path.elasticity || 0,
                d: shapes[pos].path,
                fill: {
                    value: shapes[pos].fill.color,
                    duration: shapes[pos].fill.duration,
                    easing: shapes[pos].fill.easing,
                },
                complete: function () {
                    initShapeLoop(pos);
                },
            });

            anime.remove(DOM.svg);
            anime({
                targets: DOM.svg,
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

        watcher.exitViewport(function () {
            const idx = !watcher.isAboveViewport ? pos - 1 : pos + 1;

            if (idx <= contentElemsTotal && step !== idx) {
                step = idx;
                anime.remove(DOM.svgPath);
                anime({
                    targets: DOM.svgPath,
                    duration: shapes[idx].animation.path.duration,
                    easing: shapes[idx].animation.path.easing,
                    elasticity: shapes[idx].animation.path.elasticity || 0,
                    d: shapes[idx].path,
                    fill: {
                        value: shapes[idx].fill.color,
                        duration: shapes[idx].fill.duration,
                        easing: shapes[idx].fill.easing,
                    },
                    complete: function () {
                        initShapeLoop(idx);
                    },
                });

                anime.remove(DOM.svg);
                anime({
                    targets: DOM.svg,
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
};

const init = function () {
    initsvgPath();
    createScrollWatchers();
};

init();

progressBar();

window.addEventListener("scroll", () => {
    if (html.clientWidth < 1000) {
        hideNavOnScrollMobile();
    }
    progressBar();
});
window.addEventListener("resize", () => {
    progressBar();
});
