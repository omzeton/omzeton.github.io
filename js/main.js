const body = document.body;
const html = document.documentElement;
const progress = document.getElementById("progressBar");
const spans = document.getElementsByClassName("Heading--Stagger");
const underline = document.querySelector(".Heading--Underline");
const navSelector = document.getElementById("nav--selector");
const navBtns = Array.from(document.querySelectorAll(".menu__button"));
const DOM = {};
DOM.svg = document.querySelector(".morph");
DOM.shapeEl = DOM.svg.querySelector("path");
DOM.contentElems = Array.from(document.querySelectorAll(".content-wrap"));
DOM.footer = document.querySelector(".content--related");
const contentElemsTotal = DOM.contentElems.length;
const colors = ["#ff3434", "#ffd034", "#5934ff", "#34ff82"];

// Progress Bar on the right of the screen
function progressBar() {
  let scrollTop = window.pageYOffset,
    pageHeight =
      Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      ) - html.clientHeight,
    amountScrolled = pageHeight - scrollTop,
    percentage = Math.floor((amountScrolled / pageHeight) * 100);
  percentage = 100 - percentage;

  progress.style.height = `${percentage}%`;
  return percentage;
}

// TweenMax Letter Animations
let tl = new TimelineMax();

tl.staggerTo(
  spans,
  1.5,
  {
    opacity: 1,
    y: 0,
    delay: 0.2,
    ease: Circ.easeOut
  },
  0.2
);

TweenMax.fromTo(
  underline,
  4,
  { width: "0px" },
  { width: "150px", ease: Expo.easeOut, delay: 2 }
);

// Cursor
//*{
// Plugin taken from Codrops tutorial on Sticky Image Effect
// https://tympanus.net/Tutorials/StickyImageEffect/
//}*

const cursor = new Cursor(document.querySelector(".cursor"));

// Morphing SVG in background
//*{
// Plugin taken from Codrops tutorial on Morphing Background Shapes
// https://tympanus.net/codrops/2017/05/23/on-scroll-morphing-background-shapes/
//}*

const shapes = [
  {
    path:
      "M 247.6,239.6 C 174.3,404.5 245.5,601.9 358.5,624.3 471.5,646.6 569.1,611.6 659.7,655.7 750.4,699.7 1068,687.6 1153,534.4 1237,381.1 1114,328.4 1127,227.4 1140,126.3 1016,51.08 924.6,116.8 833.8,182.5 928.4,393.8 706.8,283.5 485.2,173.1 320.8,74.68 247.6,239.6 Z",
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
      easing: "linear"
    },
    animation: {
      path: {
        duration: 3000,
        easing: "easeOutElastic",
        elasticity: 600
      },
      svg: {
        duration: 2000,
        easing: "easeOutExpo"
      }
    }
  },
  {
    path:
      "M 262.9,252.2 C 210.1,338.2 212.6,487.6 288.8,553.9 372.2,626.5 511.2,517.8 620.3,536.3 750.6,558.4 860.3,723 987.3,686.5 1089,657.3 1168,534.7 1173,429.2 1178,313.7 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z",
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
      easing: "linear"
    },
    animation: {
      path: {
        duration: 3000,
        easing: "easeOutQuad",
        elasticity: 600
      },
      svg: {
        duration: 3000,
        easing: "easeOutElastic"
      }
    }
  },
  {
    path:
      "M 262.9,252.2 C 210.1,338.2 212.6,487.6 288.8,553.9 372.2,626.5 511.2,517.8 620.3,536.3 750.6,558.4 860.3,723 987.3,686.5 1089,657.3 1168,534.7 1173,429.2 1178,313.7 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z",
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
      easing: "linear"
    },
    animation: {
      path: {
        duration: 3000,
        easing: "easeOutElastic",
        elasticity: 600
      },
      svg: {
        duration: 2000,
        easing: "easeOutElastic"
      }
    }
  },
  {
    path:
      "M 262.9,252.2 C 210.1,338.2 212.6,487.6 288.8,553.9 372.2,626.5 511.2,517.8 620.3,536.3 750.6,558.4 860.3,723 987.3,686.5 1089,657.3 1168,534.7 1173,429.2 1178,313.7 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z",
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
      easing: "linear"
    },
    animation: {
      path: {
        duration: 3000,
        easing: "easeOutQuad",
        elasticity: 600
      },
      svg: {
        duration: 3000,
        easing: "easeOutElastic"
      }
    }
  }
];

let step;

const initShapeLoop = function(pos) {
  pos = pos || 0;
  anime.remove(DOM.shapeEl);
  anime({
    targets: DOM.shapeEl,
    easing: "linear",
    d: [
      { value: shapes[pos].pathAlt, duration: 3500 },
      { value: shapes[pos].path, duration: 3500 }
    ],
    loop: true,
    fill: {
      value: shapes[pos].fill.color,
      duration: shapes[pos].fill.duration,
      easing: shapes[pos].fill.easing
    },
    direction: "alternate"
  });
};

const initShapeEl = function() {
  anime.remove(DOM.svg);
  anime({
    targets: DOM.svg,
    duration: 1,
    easing: "linear",
    scaleX: shapes[0].scaleX,
    scaleY: shapes[0].scaleY,
    translateX: shapes[0].tx + "px",
    translateY: shapes[0].ty + "px",
    rotate: shapes[0].rotate + "deg"
  });

  initShapeLoop();
};

const createScrollWatchers = function() {
  DOM.contentElems.forEach((el, pos) => {
    const scrollElemToWatch = pos ? DOM.contentElems[pos] : DOM.footer;
    pos = pos ? pos : contentElemsTotal;
    const watcher = scrollMonitor.create(scrollElemToWatch, -300);

    watcher.enterViewport(function() {
      step = pos;
      anime.remove(DOM.shapeEl);
      anime({
        targets: DOM.shapeEl,
        duration: shapes[pos].animation.path.duration,
        easing: shapes[pos].animation.path.easing,
        elasticity: shapes[pos].animation.path.elasticity || 0,
        d: shapes[pos].path,
        fill: {
          value: shapes[pos].fill.color,
          duration: shapes[pos].fill.duration,
          easing: shapes[pos].fill.easing
        },
        complete: function() {
          initShapeLoop(pos);
        }
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
        rotate: shapes[pos].rotate + "deg"
      });
    });

    watcher.exitViewport(function() {
      const idx = !watcher.isAboveViewport ? pos - 1 : pos + 1;

      if (idx <= contentElemsTotal && step !== idx) {
        step = idx;
        anime.remove(DOM.shapeEl);
        anime({
          targets: DOM.shapeEl,
          duration: shapes[idx].animation.path.duration,
          easing: shapes[idx].animation.path.easing,
          elasticity: shapes[idx].animation.path.elasticity || 0,
          d: shapes[idx].path,
          fill: {
            value: shapes[idx].fill.color,
            duration: shapes[idx].fill.duration,
            easing: shapes[idx].fill.easing
          },
          complete: function() {
            initShapeLoop(idx);
          }
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
          rotate: shapes[idx].rotate + "deg"
        });
      }
    });
  });
};

const init = function() {
  initShapeEl();
  createScrollWatchers();
};

init();

// Nav selector
function getNavSelectorPos() {
  navSelector.style.opacity = 1;
  if (window.pageYOffset <= DOM.contentElems[1].offsetTop) {
    navSelector.style.transform = "translateY(0em)";
  }
  if (
    window.pageYOffset >= DOM.contentElems[1].offsetTop &&
    window.pageYOffset <= DOM.contentElems[2].offsetTop
  ) {
    navSelector.style.transform = "translateY(2em)";
  }
  if (
    window.pageYOffset >= DOM.contentElems[2].offsetTop &&
    window.pageYOffset <= DOM.footer.offsetTop
  ) {
    navSelector.style.transform = "translateY(4em)";
  }
  if (
    window.pageYOffset >= DOM.footer.offsetTop ||
    window.pageYOffset == DOM.footer.offsetTop
  ) {
    navSelector.style.transform = "translateY(6em)";
  }
}

for (let i = 0; i < navBtns.length - 1; i++) {
  navBtns[i].addEventListener("click", () =>
    TweenMax.to(window, 1, {
      ease: Power4.easeInOut,
      scrollTo: DOM.contentElems[i].offsetTop
    })
  );
}

navBtns[3].addEventListener("click", () =>
    TweenMax.to(window, 1, {
      ease: Power4.easeInOut,
      scrollTo: DOM.footer.offsetTop
    })
  );

getNavSelectorPos();
progressBar();

window.addEventListener("scroll", () => {
  getNavSelectorPos();
  progressBar();
});
window.addEventListener("resize", () => {
  getNavSelectorPos();
  progressBar();
});

    // Effect 1
    class HoverImgFx1 {
      constructor(el) {
          this.DOM = {el: el};
          this.DOM.reveal = document.createElement('div');
          this.DOM.reveal.className = 'hover-reveal';
          this.DOM.reveal.innerHTML = `<div class="hover-reveal__inner"><div class="hover-reveal__img" style="background-image:url(${this.DOM.el.dataset.img})"></div></div>`;
          this.DOM.el.appendChild(this.DOM.reveal);
          this.DOM.revealInner = this.DOM.reveal.querySelector('.hover-reveal__inner');
          this.DOM.revealInner.style.overflow = 'hidden';
          this.DOM.revealImg = this.DOM.revealInner.querySelector('.hover-reveal__img');

          this.initEvents();
      }
      initEvents() {
          this.positionElement = (ev) => {
              const mousePos = getMousePos(ev);
              const docScrolls = {
                  left : document.body.scrollLeft + document.documentElement.scrollLeft, 
                  top : document.body.scrollTop + document.documentElement.scrollTop
              };
              this.DOM.reveal.style.top = `${mousePos.y+20-docScrolls.top}px`;
              this.DOM.reveal.style.left = `${mousePos.x+20-docScrolls.left}px`;
          };
          this.mouseenterFn = (ev) => {
              this.positionElement(ev);
              this.showImage();
          };
          this.mousemoveFn = ev => requestAnimationFrame(() => {
              this.positionElement(ev);
          });
          this.mouseleaveFn = () => {
              this.hideImage();
          };
          
          this.DOM.el.addEventListener('mouseenter', this.mouseenterFn);
          this.DOM.el.addEventListener('mousemove', this.mousemoveFn);
          this.DOM.el.addEventListener('mouseleave', this.mouseleaveFn);
      }
      showImage() {
          TweenMax.killTweensOf(this.DOM.revealInner);
          TweenMax.killTweensOf(this.DOM.revealImg);

          this.tl = new TimelineMax({
              onStart: () => {
                  this.DOM.reveal.style.opacity = 1;
                  TweenMax.set(this.DOM.el, {zIndex: 1000});
              }
          })
          .add('begin')
          .add(new TweenMax(this.DOM.revealInner, 0.2, {
              ease: Sine.easeOut,
              startAt: {x: '-100%'},
              x: '0%'
          }), 'begin')
          .add(new TweenMax(this.DOM.revealImg, 0.2, {
              ease: Sine.easeOut,
              startAt: {x: '100%'},
              x: '0%'
          }), 'begin');
      }
      hideImage() {
          TweenMax.killTweensOf(this.DOM.revealInner);
          TweenMax.killTweensOf(this.DOM.revealImg);

          this.tl = new TimelineMax({
              onStart: () => {
                  TweenMax.set(this.DOM.el, {zIndex: 999});
              },
              onComplete: () => {
                  TweenMax.set(this.DOM.el, {zIndex: ''});
                  TweenMax.set(this.DOM.reveal, {opacity: 0});
              }
          })
          .add('begin')
          .add(new TweenMax(this.DOM.revealInner, 0.2, {
              ease: Sine.easeOut,
              x: '100%'
          }), 'begin')
          
          .add(new TweenMax(this.DOM.revealImg, 0.2, {
              ease: Sine.easeOut,
              x: '-100%'
          }), 'begin');
      }
  }

[...document.querySelectorAll('[data-fx="1"] > a, a[data-fx="1"]')].forEach(link => new HoverImgFx1(link));