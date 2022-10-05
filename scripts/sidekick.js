const getAscii = (image = null, draw = canvasElement, color = false) => {
    canvasElement.width = image.width;
    canvasElement.height = image.height / 2;
    draw.getContext("2d").drawImage(image, 0, 0, image.width, image.height / 2);

    const imageData = draw
        .getContext("2d")
        .getImageData(0, 0, image.width, image.height / 2);

    let asciiImage = "";

    factor = ((259 * (255 + contrast)) / 255) * (259 - contrast);

    if (color) {
    } else {
        for (let i = 0; i < imageData.data.length; i += pixelLength * divisor) {
            // adjust contrast
            let red = Math.trunc(
                factor * (imageData.data[i] - 128) + 128
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
            if (i % (imageData.width * pixelLength * divisor) == 0 && i != 0)
                asciiImage += "\n";
        }
    }

    return asciiImage;
};