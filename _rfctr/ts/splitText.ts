export default class CustomSplitText {
    private _chars: HTMLElement[];
    constructor(private target: HTMLElement) {
        this._chars = [];
        this.sliceElements();
    }

    private sliceElements() {
        // Wrap every letter inside word in div with these styles
        // position: relative; display: inline-block;
        const targetText = this.target.innerText;
        const HTMLToInject = targetText
            .split("")
            .map((letter: string) => {
                const width = letter === " " ? "width: 16px;" : "";
                return `<div style='position: relative; display: inline-block; ${width}'>${letter}</div>`;
            })
            .join("");
        this.target.innerHTML = HTMLToInject;
        this._chars = [...this.target.children] as HTMLElement[];
    }

    public get chars() {
        return this._chars;
    }
}
