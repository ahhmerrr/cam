const getAscii = (
    image = null,
    imageW = undefined,
    imageH = undefined,
    draw = canvasElement,
    color = false
) => {
    canvasElement.width = imageW ?? image.width;
    canvasElement.height = imageH ?? image.height;
    draw.getContext("2d").drawImage(
        image,
        0,
        0,
        imageW ?? image.width,
        imageH ?? image.height
    );

    const imageData = draw
        .getContext("2d")
        .getImageData(0, 0, imageW ?? image.width, imageH ?? image.height / 2);

    let asciiImage = "";

    factor = ((259 * (255 + contrast)) / 255) * (259 - contrast);

    if (color) {
    } else {
        for (let i = 0; i < imageData.data.length; i += pixelLength * divisor) {
            // adjust contrast
            let red = Math.trunc(
                factor * (imageData.data[i] - 128) + 128 + brightness
            ).clamp(0, 255);
            let green = Math.trunc(
                factor * (imageData.data[i + 1] - 128) + 128 + brightness
            ).clamp(0, 255);
            let blue = Math.trunc(
                factor * (imageData.data[i + 2] - 128) + 128 + brightness
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
                i % ((imageW ?? imageData.width) * pixelLength * divisor) ==
                    0 &&
                i != 0
            )
                asciiImage += "\n";
        }
    }

    return asciiImage;
};
