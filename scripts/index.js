navigator.mediaDevices
    .getUserMedia({
        audio: false,
        video: true,
    })
    .then((stream) => camera(stream))
    .catch((err) => console.log({ err }));

function camera(stream) {
    fpsElement.style.display = "block";
    nocamElement.style.display = "none";
    playing = true;

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
    }, 1000 / fps);
}
