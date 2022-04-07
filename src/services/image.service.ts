import sharp from "sharp";

export class ImageService {
    async imageMetadata(image: Buffer) {
        try {
            const metadata = await sharp(image).metadata();
            return metadata;
        } catch (error) {
            console.log(error);
        }
    }

    async resizeImage(image: Buffer, width: number, height: number) {
        try {
            const resizedImage = await sharp(image)
                .resize({ width, height })
                .toBuffer();

            return resizedImage;
        } catch (error) {
            console.log(`An error occurred during processing: ${error}`);
        }
    }

    async compressImage(image: Buffer) {
        try {
            const compressedImage = await sharp(image)
                .toFormat("jpg", { mozjpeg: true })
                .toBuffer();
            return compressedImage;
        } catch (error) {
            console.log(`An error occurred during processing: ${error}`);
        }
    }

    async cropImage(
        image: Buffer,
        width: number,
        height: number,
        left: number,
        top: number
    ) {
        try {
            const croppedImage = await sharp(image)
                .extract({ width, height, left, top })
                .toBuffer();
            return croppedImage;
        } catch (error) {
            console.log(error);
        }
    }

    async grayscaleImage(image: Buffer) {
        try {
            const grayscaledImage = await sharp(image).grayscale().toBuffer();
            return grayscaledImage;
        } catch (error) {
            console.log(error);
        }
    }

    async blurImage(image: Buffer, sigma: number) {
        try {
            if (sigma < 0.3) sigma = 0.3;
            if (sigma > 50) sigma = 50;

            const blurredImage = await sharp(image).blur(sigma).toBuffer();
            return blurredImage;
        } catch (error) {
            console.log(error);
        }
    }

    async composeImages(background: Buffer, front: Buffer, top = 0, left = 0) {
        try {
            const composedImage = await sharp(background)
                .composite([
                    {
                        input: front,
                        top,
                        left,
                    },
                ])
                .toBuffer();

            return composedImage;
        } catch (error) {
            console.log(error);
        }
    }

    async addTextToImage(
        image: Buffer,
        text: string,
        fontSize = 72,
        color = "#fff"
    ) {
        try {
            const width = (await sharp(image).metadata()).width;
            const height = (await sharp(image).metadata()).height;

            const svgText = `
            <svg width="${width}" height="${height}">
              <style>
              .title { fill: ${color}; font-size: ${fontSize}px; font-weight: bold; font-family: Arial}
              </style>
              <text x="50%" y="50%" text-anchor="middle" class="title">${text}</text>
            </svg>`;

            const svgTextBuffer = Buffer.from(svgText);

            const editedImage = await sharp(image)
                .composite([
                    {
                        input: svgTextBuffer,
                        top: 0,
                        left: 0,
                    },
                ])
                .toBuffer();

            return editedImage;
        } catch (error) {
            console.log(error);
        }
    }
}
