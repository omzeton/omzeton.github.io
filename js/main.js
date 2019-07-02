const body = document.body,
  html = document.documentElement,
  progress = document.getElementById("progressBar");

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
