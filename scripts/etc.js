// letter "color" pallette
let pallette =
    "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'."
        .split("")
        .reverse();

// grab elements from DOM immediately
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
const infoBtnElement = document.getElementById("infoBtn");

const backdropElement = document.getElementById("backdrop");
const settingsModalElement = document.getElementById("settingsModal");
const navPanelElement = document.getElementById("panel");

// pixel (letter) font size
let fontSize = 3;
screenElement.style.fontSize = `${fontSize}px`;
// width of a monospace character relative to its height
let widthFactor = 0.5;
// pixel resolution in characters (NOT pixels)
let resolution = [120, 240];

const pixelLength = 4;
const divisor = 1;

// camera size
const camSize = {
    width: { ideal: resolution[0] * fontSize },
    height: { ideal: resolution[1] * fontSize * widthFactor },
};

// image contrast
let contrast = 128;
// image brightness
let brightness = 0;
// frames per second to use
let fps = 30;

// pause and stop control variables
let playing = false;
let running = true;

// clamp utility function
Number.prototype.clamp = function (min, max) {
    return Math.min(Math.max(this, min), max);
};
