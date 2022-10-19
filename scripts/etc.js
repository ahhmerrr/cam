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
const widthPixelsDisplayElement = document.getElementById("widthPixelsDisplay");
const heightDisplayElement = document.getElementById("heightDisplay");
const heightPixelsDisplayElement = document.getElementById(
    "heightPixelsDisplay"
);
const fpsElement = document.getElementById("fps");
const nocamElement = document.getElementById("nocam");
const errorElement = document.getElementById("error");

const settingsBtnElement = document.getElementById("settingsBtn");
const startBtnElement = document.getElementById("startBtn");
const themeBtnElement = document.getElementById("themeBtn");
const pauseBtnElement = document.getElementById("pauseBtn");
const infoBtnElement = document.getElementById("infoBtn");
const copyBtnElement = document.getElementById("copyBtn");

const presetButtonElements = [
    document.getElementById("preset1"),
    document.getElementById("preset2"),
    document.getElementById("preset3"),
    document.getElementById("preset4"),
    document.getElementById("preset5"),
    document.getElementById("preset6"),
    document.getElementById("preset7"),
    document.getElementById("preset8"),
    document.getElementById("preset9"),
    document.getElementById("preset10"),
    document.getElementById("preset11"),
    document.getElementById("preset12"),
];
const invertBtnElement = document.getElementById("invertBtn");
const halveWidthBtnElement = document.getElementById("halveWidthBtn");
const halveHeightBtnElement = document.getElementById("halveHeightBtn");
const doubleWidthBtnElement = document.getElementById("doubleWidthBtn");
const doubleHeightBtnElement = document.getElementById("doubleHeightBtn");

const fontSliderElement = document.getElementById("fontSlider");
const widthSliderElement = document.getElementById("widthSlider");
const heightSliderElement = document.getElementById("heightSlider");

const backdropElement = document.getElementById("backdrop");
const settingsModalElement = document.getElementById("settingsModal");
const navPanelElement = document.getElementById("panel");

const context = canvasElement.getContext("2d", { willReadFrequently: true });

// pixel (letter) font size
let fontSize = 2;
screenElement.style.fontSize = `${fontSize}px`;
// width of a monospace character relative to its height
let widthFactor = 0.5;
// pixel resolution in characters (NOT pixels)

// let maxResolution = [
//     window.innerWidth / fontSize / widthFactor,
//     window.innerHeight / fontSize,
// ];
let maxResolution = [0, 0];
let resolution = [0, 0];

const presetPixelResolutions = [
    [192, 144],
    [854, 480],
    [640, 360],
    [426, 240],
    [1024, 576],
    [1152, 648],
    [1280, 720],
    [1366, 768],
    [1600, 900],
    [1920, 1080],
    [2560, 1440],
    [3840, 2160],
];

fontSliderElement.value = fontSize;
fontDisplayElement.innerHTML = fontSize;

const pixelLength = 4;

// camera size
let camSize = {
    width: { ideal: 3840 },
    height: { ideal: 2160 },
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
