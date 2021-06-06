export default class CustomSplitText {
    constructor(target) {
        this.target = target;
        this._chars = [];
        this.sliceElements();
    }

    sliceElements() {
        // Wrap every letter inside word in div with these styles
        // position: relative; display: inline-block;
        const targetText = this.target.innerText;
        const HTMLToInject = targetText
            .split("")
            .map(letter => {
                const width = letter === " " ? "width: 16px;" : "";
                return `<div style='position: relative; display: inline-block; ${width}'>${letter}</div>`;
            })
            .join("");
        this.target.innerHTML = HTMLToInject;
        this._chars = [...this.target.children];
    }

    get chars() {
        return this._chars;
    }
}
