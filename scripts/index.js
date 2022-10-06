// get a MediaStream with video but no audio
navigator.mediaDevices
    .getUserMedia({
        audio: false,
        video: camSize,
    })
    .then((stream) => {
        startBtnElement.addEventListener("click", () => switcher(stream));
    })
    .catch((err) => console.log({ err }));

const switcher = (stream) => {
    // hide/show extra stuff
    fpsElement.style.display = "block";
    settingsBtnElement.style.display = "block";
    nocamElement.style.display = "none";
    startBtnElement.style.display = "none";
    playing = true;

    // use ImageCapture API if available
    if ("ImageCapture" in window) {
        captureCamera(stream);
    }
    // otherwise use built-in HTML5 video API
    else {
        videoElement.srcObject = stream;
        videoElement.play().then(() => {
            videoCamera(videoElement);
        });
    }
};

const captureCamera = (stream) => {
    // create an ImageCapture object for grabbing frames from the camera
    let capture = new ImageCapture(stream.getVideoTracks()[0]);
    let time = 0;

    const interval = setInterval(() => {
        if (playing) {
            capture
                .grabFrame()
                .then((frame) => {
                    screenElement.innerHTML = getAscii(frame);
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
            closeInterval(interval);
            return;
        }
    }, 1000 / fps);
};

const videoCamera = (video) => {
    let time = 0;

    const interval = setInterval(() => {
        if (playing) {
            // with the video element
            screenElement.innerHTML = getAscii(
                video,
                video.videoWidth,
                video.videoHeight / 2
            );

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
