# cam

## your camera, but ASCII

## How it Works

The key idea for this project is that each pixel has an *apparent brightness*. No color is technically "bright" or "dark"; it's just how bright/dark it *appears* to the human eye.

### Gaining access to the camera

This program used to use the `ImageCapture` API, but I found it to be very buggy, albeit very fast. The API also does not have support in Firefox and Safari, so what I have done instead is to have a video source whose source (`srcObject`) is the `MediaStream` obtained from the user's camera. This is exactly what this segment of code does, in the `index.js` file:

```js
navigator.mediaDevices
    .getUserMedia({
        audio: false,
        video: {
            width: fontSize * resolution[0],
            height: fontSize * widthFactor * resolution[1],
        },
    })
    .then((stream) => {=
        startBtnElement.addEventListener("click", () => switcher(stream));
    })
    .catch((err) => console.log(err));
```

In this segment of code, I am

1. Getting user media without audio, and with a video of ideal width `fontSize * resolution[0]` (the pixel width of each letter multiplied by the number of letters we want in each row), and ideal height `fontSize * widthFactor * resolution[1]` (the pixel width of each letter multiplied by a constant that represents the height of the letter, given the width multiplied by the number of letters we want in each column)
2. Attaching a function that has an argument of the obtained stream to a button event listener

In the `switcher` function, we are setting the source (`srcObject`) of the video element on the page to the `MediaStream` obtained from the user's camera, and then playing the video (`MediaStream`) and passing it to another function:

```js
videoElement.srcObject = stream;
videoElement.play().then(() => {
    videoCamera(videoElement);
});
```

### Grabbing images from the camera

With the `ImageCapture` API, getting frames from the camera is very easy with the `grabFrame()` method. However, like I said before, I found it to be very buggy and unsupported, so I am using HTML5's built-in video DOM reference.

First off, to imitate video, we need to have some sort of interval. I set an interval like such:

``` js
const interval = setInterval(() => {
    /* frame stuff */
}, 1000 / fps);
```

This interval is running at `fps` frames per second; the time of each interval (in seconds) is $1/fps$, so the time of each interval in milliseconds is $1000/fps$. Adding content:

```js
const interval = setInterval(() => {
    screenElement.innerHTML = getAscii(
        video,
        video.videoWidth,
        video.videoHeight * widthFactor
    );
}, 1000 / fps);
```

Every $1/fps$ seconds ($1000/fps$ milliseconds), we are sending over the video reference to another function. This is where things start getting interesting.

### Converting images to ASCII

The `getAscii` function is where

---

***README STILL UNDER CONSTRUCTION***
