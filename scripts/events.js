settingsBtnElement.addEventListener("click", (event) => {
    settingsModalElement.style.display =
        settingsModalElement.style.display === "block" ? "none" : "block";
    backdropElement.style.display =
        backdropElement.style.display === "block" ? "none" : "block";
});

// swap foreground and background when transitioning
// from dark to light mode and vice versa
themeBtnElement.addEventListener("click", (event) => {
    const prevFore = getComputedStyle(
        document.documentElement
    ).getPropertyValue("--foreground");
    const prevBack = getComputedStyle(
        document.documentElement
    ).getPropertyValue("--background");

    document.documentElement.style.setProperty("--foreground", prevBack);
    document.documentElement.style.setProperty("--background", prevFore);

    if (themeBtnElement.innerHTML === "Dark")
        themeBtnElement.innerHTML = "Light";
    else themeBtnElement.innerHTML = "Dark";

    pallette = pallette.reverse();
});

copyBtnElement.addEventListener("click", (event) => {
    navigator.clipboard.writeText(screenElement.innerText);
});

// handle a pause (easy with the HTML5 video reference)
pauseBtnElement.addEventListener("click", (event) => {
    playing = !playing;

    if (playing) pauseBtnElement.innerHTML = "Pause";
    else pauseBtnElement.innerHTML = "Play";
});

backdropElement.addEventListener("click", (event) => {
    settingsModalElement.style.display = "none";
    backdropElement.style.display = "none";
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        settingsModalElement.style.display = "none";
        backdropElement.style.display = "none";
    }
});

fontSliderElement.addEventListener("input", () => {
    fontSize = fontSliderElement.value;
    screenElement.style.fontSize = `${fontSize}px`;
    fontDisplayElement.innerHTML = fontSize;

    refresh(false);
});

widthSliderElement.addEventListener("input", () => {
    resolution[0] = widthSliderElement.value / fontSize / widthFactor;

    refresh(false);
    resetMedia();
});

heightSliderElement.addEventListener("input", () => {
    resolution[1] = heightSliderElement.value / fontSize;

    refresh(false);
    resetMedia();
});

presetButtonElements.forEach((presetButton) => {
    presetButton.addEventListener("click", (event) => {
        resolution = [
            parseInt(event.target.innerHTML.split("×")[0]) /
                fontSize /
                widthFactor,
            parseInt(event.target.innerHTML.split("×")[1]) / fontSize,
        ];

        refresh();
        resetMedia();
    });
});

invertBtnElement.addEventListener("click", (event) => {
    const prevWidth = resolution[0];
    const prevHeight = resolution[1];

    resolution[0] = prevHeight;
    resolution[1] = prevWidth;

    refresh();
    resetMedia();
});

doubleWidthBtnElement.addEventListener("click", (event) => {
    resolution[0] *= 2;

    refresh();
    resetMedia();
});

doubleHeightBtnElement.addEventListener("click", (event) => {
    resolution[1] *= 2;

    refresh();
    resetMedia();
});

halveWidthBtnElement.addEventListener("click", (event) => {
    resolution[0] /= 2;

    refresh();
    resetMedia();
});

halveHeightBtnElement.addEventListener("click", (event) => {
    resolution[1] /= 2;

    refresh();
    resetMedia();
});

// close video tracks when page is closed
window.addEventListener("unload", (event) => {
    videoElement.srcObject.getVideoTracks()[0].stop();
    return null;
});
window.addEventListener("beforeunload", (event) => {
    videoElement.srcObject.getVideoTracks()[0].stop();
    return null;
});

window.onunload = () => {
    videoElement.srcObject.getVideoTracks()[0].stop();
    return null;
};
window.onbeforeunload = () => {
    videoElement.srcObject.getVideoTracks()[0].stop();
    return null;
};
