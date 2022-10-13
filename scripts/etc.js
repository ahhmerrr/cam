// letter "color" pallette
let pallette =
    "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'."
        .split("")
        .reverse();

// grab elements from DOM immediately
const screenElement = document.getElementById("screen");
const canvasElement = document.getElementById("canvas");
const videoElement = document.getElementById("video");

const fontDisplayElement = document.getElementById("fontDisplay");
const widthDisplayElement = document.getElementById("widthDisplay");
const heightDisplayElement = document.getElementById("heightDisplay");
const fpsElement = document.getElementById("fps");
const nocamElement = document.getElementById("nocam");
const errorElement = document.getElementById("error");

const settingsBtnElement = document.getElementById("settingsBtn");
const startBtnElement = document.getElementById("startBtn");
const themeBtnElement = document.getElementById("themeBtn");
const pauseBtnElement = document.getElementById("pauseBtn");
const infoBtnElement = document.getElementById("infoBtn");

const fontSliderElement = document.getElementById("fontSlider");
const widthSliderElement = document.getElementById("widthSlider");
const heightSliderElement = document.getElementById("heightSlider");

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

let maxResolution = [
    window.innerWidth / fontSize / widthFactor,
    window.innerHeight / fontSize,
];

console.log({ maxResolution });

fontDisplayElement.innerHTML = `${fontSize}px`;
widthDisplayElement.innerHTML = `${resolution[0]} characters`;
heightDisplayElement.innerHTML = `${resolution[1]} characters`;

widthSliderElement.value = resolution[0];
widthSliderElement.max = maxResolution[0];
heightSliderElement.value = resolution[1];
heightSliderElement.max = maxResolution[1];

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

fontSliderElement.value = fontSize;

widthSliderElement.value = resolution[0];
widthSliderElement.maxValue = resolution[0];

heightSliderElement.value = resolution[1];
