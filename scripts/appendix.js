// function for getting the ASCII representation of an image
// TODO: implement in Wasm
const getAscii = (
    image = null,
    imageW = undefined,
    imageH = undefined,
    color = false
) => {
    // set the canvas element's dimensions to imageW and imageH if defined,
    // otherwise the image's width and height
    canvasElement.width = imageW ?? image.width;
    canvasElement.height = imageH ?? image.height;

    let imageData = null;

    try {
        // draw the image (of type ImageBitmap) type to the canvas...
        context.drawImage(
            image,
            0,
            0,
            imageW ?? image.width,
            imageH ?? image.height
        );

        // ...and get it back from the canvas, receiving
        // the raw ImageData instead of the ImageBitmap
        imageData = context.getImageData(
            0,
            0,
            imageW ?? image.width,
            imageH ?? image.height / 2
        );
    } catch (err) {
        console.log(err);
        return null;
    }

    let asciiImage = "";

    // contrast factor to use
    factor = ((259 * (255 + contrast)) / 255) * (259 - contrast);

    // if using color
    // TODO: implement color
    if (color) {
    }
    // otherwise
    else {
        for (let i = 0; i < imageData.data.length; i += pixelLength) {
            if (
                i % ((imageW ?? imageData.width) * pixelLength) === 0 &&
                i !== 0
            )
                asciiImage += "\n";

            // adjust contrast
            let red = (
                Math.trunc(factor * (imageData.data[i] - 128) + 128) +
                brightness
            ).clamp(0, 255);
            let green = (
                Math.trunc(factor * (imageData.data[i + 1] - 128) + 128) +
                brightness
            ).clamp(0, 255);
            let blue = (
                Math.trunc(factor * (imageData.data[i + 2] - 128) + 128) +
                brightness
            ).clamp(0, 255);

            // get brightness of pixel
            const pixelBrightness =
                0.2126 * red + 0.7152 * green + 0.0722 * blue;

            // convert pixel to ascii character
            asciiImage +=
                pallette[
                    Math.round((pixelBrightness / 255) * (pallette.length - 1))
                ];

            // increment row and add newline if a new row is reached
        }
    }

    return asciiImage;
};

const resetMedia = (newRes = resolution) => {
    running = false;

    navigator.mediaDevices
        .getUserMedia({
            audio: false,
            video: {
                width: fontSize * resolution[0],
                height: fontSize * resolution[1],
            },
        })
        .then((stream) => {
            running = true;
            globalMedia = stream;
            switcher(globalMedia);
        })
        // TODO: display message if user does not have camera/error with opening track
        .catch((err) => console.log(err));
};

const refresh = (updateSliders = true) => {
    if (updateSliders) widthSliderElement.value = resolution[0];
    widthDisplayElement.innerHTML = resolution[0];
    widthPixelsDisplayElement.innerHTML =
        resolution[0] * fontSize * widthFactor;

    if (updateSliders) heightSliderElement.value = resolution[1];
    heightDisplayElement.innerHTML = resolution[1];
    heightPixelsDisplayElement.innerHTML = resolution[1] * fontSize;
};

const refreshMax = () => {
    maxResolution = [
        maxCameraResolution[0] / fontSize / widthFactor,
        maxCameraResolution[1] / fontSize,
    ];

    widthSliderElement.max = maxResolution[0];
    heightSliderElement.max = maxResolution[1];
};
