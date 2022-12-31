# cam

## Your camera, but ASCII

See your face as a pool of $'s, ]'s, and ^'s.

View live @ [ahhmerrr.github.io/cam](https://ahmrr.github.io/cam/)

**If you have any features to suggest, or bugs to report, please create a new issue and/or let me know via email.**

## How it Works

**NOTES**:

- I am presenting a simplified version here, with the premise that you wish to replicate it yourself. I have added a lot more functionality than the project represented by this simple guide in my own project.
- This guide assumes the screen (background) is black or some other dark color, and the "pixels" (characters) are white.

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

The `getAscii` function is where the real magic happens.

```js
function getAscii(image) {
    /* processing stuff */
};
```

The image parameter is an `ImageBitmap` (if using the `ImageCapture` API) or `HTMLVideoElement` (if using the HTML video reference) object. Adding some initialization content:

```js
function getAscii(image) {
    canvas.width = image.width;
    canvas.height = image.height;

    let imageData = null;

    // obtain raw image data for image
    context.drawImage(
        image,
        0,
        0,
        image.width,
        image.height
    );
    imageData = context.getImageData(
        0,
        0,
        image.width,
        image.height * widthFactor
    );

    let asciiImage = "";

    /* process raw image data */

    return asciiImage;
};
```

Here, what we're doing is drawing the image to a canvas, and then getting back raw image data from the canvas. The reason we do this is because we can't access individual pixels from an `ImageBitmap` (or `HTMLVideoElement`), but if we draw it to an `HTMLCanvasElement` using its `CanvasRenderingContext2D`, and then reobtain it as raw image data (as a `Uint8Array`), we can process each pixel individually.

When drawing to the canvas, we are using the image's default width and height. However, because an ASCII character is taller than it is wide (rectangular), and a pixel is perfectly square, there has to be some "smushing" (vertical compression) done to the image retrieved from the canvas, so that we can represent each pixel in the unaltered image as a normal ASCII character.

**NOTES**:

- be sure to use a monospaced font, or this won't work. With a monospaced font, characters have the same width, so it is possible to use them as "pixels".

The value I found that works best for `widthFactor` is $0.5$.

Once we've gotten the array, we have to process each pixel in it. The pixel array is 1D (not a 2D array), so iterating over it requires a bit mre logic. Additionally, each pixel is represented as 4 values in the array, instead of a tuple (or tuple-ish object): red, green, blue, and alpha (opacity). We are going to ignore the alpha value and just process the R, G, and B values.

For each pixel, we need to:

1. Be able to modify its contrast, so that contours are more visible in ASCII grayscale
2. Be able to increase/decrease its brightness
3. Calculate its perceived brightness

Altogether, it looks something like this:

```js
function getAscii(image) {
    canvas.width = image.width;
    canvas.height = image.height;

    let imageData = null;

    // obtain raw image data for image
    context.drawImage(
        image,
        0,
        0,
        image.width,
        image.height
    );
    imageData = context.getImageData(
        0,
        0,
        image.width,
        image.height * widthFactor
    );

    let asciiImage = "";

    const factor = ((259 * (255 + contrast)) / 255) * (259 - contrast);

    for (let i = 0; i < imageData.data.length; i += pixelLength) {
        let red = Math.trunc(factor * (imageData.data[i] - 128) + 128);
        let green = Math.trunc(factor * (imageData.data[i + 1] - 128) + 128);
        let blue = Math.trunc(factor * (imageData.data[i + 2] - 128) + 128);

        red += brightness;
        blue += brightness;
        green += brightness;

        if (red > 255) red = 255;
        if (green > 255) green = 255;
        if (blue > 255) blue = 255;

        if (red < 0) red = 0;
        if (green < 0) green = 0;
        if (blue < 0) blue = 0;

        const pixelBrightness =
            0.2126 * red + 0.7152 * green + 0.0722 * blue;
    }

    return asciiImage;
};
```

Here is where things start to get a bit interesting. Let `α` (the contrast modifier) and `β` (the brightness modifier) be values in the interval $[-128, 127]$. The formula for adjusting a pixel's contrast is
    $C'=F*(C-128)+128$
where `C` is a color (R, G, or B value of a pixel), and where the contrast factor is
    $F=((259*(255+α))/255)*(259-α)$
and $C'$ is the new, adjusted color.

Adjusting brightness is easier; you simply add the brightness modifier:
    $C' = C + β$

We also have to keep the values of each color in the interval $[0, 255]$. I did this in my program using a `clamp` function that I defined in `Number.prototype`, but for simplicity, here I am only using some `if` statements.

Finally, we have to calculate the perceived brightness of the pixel. Remember that no screen color is "dark" or "light": it's the way our eyes *view* those colors that make them so. A formula (one of many) for computing perceived brightness is:
    $$B=0.2126*r+0.7152*g+0.0722b$$
where $r$, $g$, and $b$ are the pixel's red, green, and blue values. This formula is based on the idea that the human eye is most sensitive to green light, then red, and then blue.

Once we have our perceived brightness, we are now ready to convert the pixel to an ASCII character. First, though, we need a palette of characters to choose from. The larger your palette, the more pixel "diversity" and the better gradients and contours will look. I chose the following character palette:

```$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:,\"^`'.```

This is ordered from highest "brightness" to lowest (or vice versa, if you're using black text on a white background). The `$` character is the "brightest" (or darkest, if your text color is white) and the `.` character is the "darkest" (again, or brightest). Keep in mind that this is all just perceived brightness.

Implementing this palette, and now storing the character chosen from the palette in the buffer:

```js
function getAscii(image) {
    canvas.width = image.width;
    canvas.height = image.height;

    let imageData = null;

    // obtain raw image data for image
    context.drawImage(
        image,
        0,
        0,
        image.width,
        image.height
    );
    imageData = context.getImageData(
        0,
        0,
        image.width,
        image.height * widthFactor
    );

    let asciiImage = "";
    
    const pallette =
        "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'."
            .split("")

    const factor = ((259 * (255 + contrast)) / 255) * (259 - contrast);

    for (let i = 0; i < imageData.data.length; i += pixelLength) {
        let red = Math.trunc(factor * (imageData.data[i] - 128) + 128);
        let green = Math.trunc(factor * (imageData.data[i + 1] - 128) + 128);
        let blue = Math.trunc(factor * (imageData.data[i + 2] - 128) + 128);

        red += brightness;
        blue += brightness;
        green += brightness;

        if (red > 255) red = 255;
        if (green > 255) green = 255;
        if (blue > 255) blue = 255;

        if (red < 0) red = 0;
        if (green < 0) green = 0;
        if (blue < 0) blue = 0;

        const pixelBrightness =
            0.2126 * red + 0.7152 * green + 0.0722 * blue;
        
        asciiImage +=
            pallette[
                Math.round((pixelBrightness / 255) * (pallette.length - 1))
            ];
    }

    return asciiImage;
};
```

We are now adding a character onto the `asciiImage` variable, based on `pixelBrightness`. We are almost done; we just have one problem! The entire image is stored in one line. To fix this, we have to add a newline after every row. However, since we are working with a 1D array, detecting row boundaries is a bit more difficult. The completed code is as such:

```js
function getAscii(image) {
    canvas.width = image.width;
    canvas.height = image.height;

    let imageData = null;

    // obtain raw image data for image
    context.drawImage(
        image,
        0,
        0,
        image.width,
        image.height
    );
    imageData = context.getImageData(
        0,
        0,
        image.width,
        image.height * widthFactor
    );

    let asciiImage = "";
    
    const pallette =
        "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'."
            .split("")

    const factor = ((259 * (255 + contrast)) / 255) * (259 - contrast);

    for (let i = 0; i < imageData.data.length; i += pixelLength) {
        if (i % (imageData.width * 4) === 0 && i !== 0)
            asciiImage += "\n";

        let red = Math.trunc(factor * (imageData.data[i] - 128) + 128);
        let green = Math.trunc(factor * (imageData.data[i + 1] - 128) + 128);
        let blue = Math.trunc(factor * (imageData.data[i + 2] - 128) + 128);

        red += brightness;
        blue += brightness;
        green += brightness;

        if (red > 255) red = 255;
        if (green > 255) green = 255;
        if (blue > 255) blue = 255;

        if (red < 0) red = 0;
        if (green < 0) green = 0;
        if (blue < 0) blue = 0;

        const pixelBrightness =
            0.2126 * red + 0.7152 * green + 0.0722 * blue;
        
        asciiImage +=
            pallette[
                Math.round((pixelBrightness / 255) * (pallette.length - 1))
            ];
    }

    return asciiImage;
};
```

The additional statement appends a newline every time the counter is a multiple of row size (multiplied by the length of each pixel: 4, since each pixel has R, G, B, and A values) AND the counter is not 0. This should be fairly obvious.

And there you have it! You should now be able to create such a program by yourself; in the meantime, enjoy!

---

**Please create an issue or otherwise LMK via email if you have any suggestions to the README.**
