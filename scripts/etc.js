const pallette =
    "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'."
        .split("")
        .reverse();

const fpsElement = document.getElementById("fps");
const screenElement = document.getElementById("screen");
const canvasElement = document.getElementById("canvas");
const videoElement = document.getElementById("video");
const nocamElement = document.getElementById("nocam");

const settingsBtnElement = document.getElementById("settingsBtn");
const startBtnElement = document.getElementById("startBtn");
const settingsModalElement = document.getElementById("settingsModal");

const pixelLength = 4;
const divisor = 1;

const camSize = true;

let contrast = 128;
let brightness = 0;
let fps = 30;

let playing = false;
let running = true;

Number.prototype.clamp = function (min, max) {
    return Math.min(Math.max(this, min), max);
};
