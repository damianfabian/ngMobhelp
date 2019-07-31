let _width: number = window.outerWidth;

window.addEventListener("resize", checkAgent);


function checkAgent(): void {
    _width = window.outerWidth;
}

export function isMobile(): boolean {
    return _width <= 415;
}