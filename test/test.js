const canvas = document.getElementById("canvas");

navigator.mediaDevices
    .getUserMedia({
        audio: false,
        video: { width: 640, height: 480 },
    })
    .then((stream) => camera(stream))
    .catch((err) => console.log({ err }));

function camera(stream) {
    let capture = new ImageCapture(stream.getVideoTracks()[0]);

    let time = 0;

    const interval = setInterval(() => {
        capture
            .grabFrame()
            .then((frame) => {
                canvas.width = frame.width;
                canvas.height = frame.height;
                canvas
                    .getContext("2d")
                    .drawImage(frame, 0, 0, frame.width, frame.height);
            })
            .catch((err) => {
                console.log({ err });
            });
    }, 1000 / 10);
}
