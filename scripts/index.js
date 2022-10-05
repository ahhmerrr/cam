// use ImageCapture API
if ("ImageCapture" in window) {
    navigator.mediaDevices
        .getUserMedia({
            audio: false,
            video: true,
        })
        .then((stream) => camera(stream))
        .catch((err) => console.log({ err }));
}
// use built-in HTML5 video API
else {
}

const camera = (stream) => {
    // hide/show extra stuff
    fpsElement.style.display = "block";
    nocamElement.style.display = "none";
    playing = true;

    // create an ImageCapture object for grabbing frames from the camera
    let capture = new ImageCapture(stream.getVideoTracks()[0]);

    let time = 0;

    const interval = setInterval(() => {
        if (playing) {
            capture
                .grabFrame()
                .then((frame) => {
                    screenElement.innerHTML = getAscii(frame);
                    nocamElement.style.display = "none";
                })
                .catch((err) => {
                    console.log({ err });
                });

            fpsElement.textContent =
                "fps: " + Math.round((1 / (performance.now() - time)) * 1000);
            time = performance.now();
        }

        if (!running) {
            stream.getVideoTracks()[0].stop();
            capture.closoe;
        }
    }, 1000 / fps);
};

const otherCamera = (stream) => {};
