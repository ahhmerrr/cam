const pallette =
    "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'."
        .split("")
        .reverse();

const fpsElement = document.getElementById("fps");
const screenElement = document.getElementById("screen");
const canvasElement = document.getElementById("canvas");
const videoElement = document.getElementById("video");

const nocamElement = document.getElementById("nocam");
const errorElement = document.getElementById("error");

const settingsBtnElement = document.getElementById("settingsBtn");
const startBtnElement = document.getElementById("startBtn");
const themeBtnElement = document.getElementById("themeBtn");
const pauseBtnElement = document.getElementById("pauseBtn");
const settingsModalElement = document.getElementById("settingsModal");

const pixelLength = 4;
const divisor = 1;

const camSize = true;

let contrast = 128;
let brightness = 128;
let fps = 60;

let playing = false;
let running = true;

let fontSize = 2;
screenElement.style.fontSize = `${fontSize}px`;
let widthFactor = 0.4;
let resolution = [240, 480];

Number.prototype.clamp = function (min, max) {
    return Math.min(Math.max(this, min), max);
};
