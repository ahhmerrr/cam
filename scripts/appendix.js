// function for getting the ASCII representation of an image
// TODO: implement in WASM
const getAscii = (
    image = null,
    imageW = undefined,
    imageH = undefined,
    draw = canvasElement,
    color = false
) => {
    // set the canvas element's dimensions to imageW and imageH if defined,
    // otherwise the image's width and height
    canvasElement.width = imageW ?? image.width;
    canvasElement.height = imageH ?? image.height;

    // draw the image (of type ImageBitmap) type to the canvas...
    draw.getContext("2d").drawImage(
        image,
        0,
        0,
        imageW ?? image.width,
        imageH ?? image.height
    );

    // ...and get it back from the canvas, receiving
    // the raw ImageData instead of the ImageBitmap
    const imageData = draw
        .getContext("2d")
        .getImageData(0, 0, imageW ?? image.width, imageH ?? image.height / 2);

    let asciiImage = "";

    // contrast factor to use
    factor = ((259 * (255 + contrast)) / 255) * (259 - contrast);

    // if using color
    // TODO: implement color
    if (color) {
    }
    // otherwise
    else {
        for (let i = 0; i < imageData.data.length; i += pixelLength * divisor) {
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
            if (
                i % ((imageW ?? imageData.width) * pixelLength * divisor) ===
                    0 &&
                i !== 0
            )
                asciiImage += "\n";
        }
    }

    return asciiImage;
};
