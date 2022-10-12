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

// handle a pause (easy with the HTML5 video reference)
pauseBtnElement.addEventListener("click", (event) => {
    playing = !playing;

    if (playing) pauseBtnElement.innerHTML = "Pause";
    else pauseBtnElement.innerHTML = "Play";
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
