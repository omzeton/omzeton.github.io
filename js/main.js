const body = document.body,
  html = document.documentElement,
  progress = document.getElementById("progressBar"),
  spans = document.getElementsByClassName("Heading--Stagger");

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

window.addEventListener("scroll", () => progressBar());
window.addEventListener("resize", () => progressBar());
document.addEventListener("load", () => {
  progressBar();
});


// TweenMax Letter Animations
let tl = new TimelineMax();

tl.staggerTo(
  spans,
  1.5,
  {
    opacity: 1,
    y: 0,
    delay: 0.5,
    ease: Circ.easeOut
  },
  0.2
);

// Cursor
const cursor = new Cursor(document.querySelector('.cursor'));