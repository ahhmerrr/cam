settingsBtnElement.addEventListener("click", (event) => {
    settingsModalElement.style.display =
        settingsModalElement.style.display === "block" ? "none" : "block";
});

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

pauseBtnElement.addEventListener("click", (event) => {
    playing = !playing;

    if (playing) pauseBtnElement.innerHTML = "Pause";
    else pauseBtnElement.innerHTML = "Play";
});
