const lerp = (a, b, n) => (1 - n) * a + n * b;

const init = () => {
    const _EASE = 0.05;
    const main = document.querySelector("main");
    const scrollContainer = main.querySelector("#scroll-container");
    let thatPreviousScrollValue = 0;
    let thisCurrentScrollValue = 0;

    document.body.style.height = `${scrollContainer.scrollHeight + 100}px`;
    main.style.position = "fixed";
    main.style.width = main.style.height = "100%";

    window.addEventListener("scroll", () => (thisCurrentScrollValue = window.pageYOffset || document.documentElement.scrollTop));

    const animate = () => {
        thatPreviousScrollValue = lerp(thatPreviousScrollValue, thisCurrentScrollValue, _EASE);
        scrollContainer.style.transform = `translate3d(0, ${-1 * thatPreviousScrollValue}px, 0)`;
        requestAnimationFrame(animate);
    };
    animate();
};

export default init;
