import { Request, Response } from "express";
import stream from "stream";
import { ImageService } from "./../services/image.service";

const imageService = new ImageService();

interface RequestFiles extends Request {
    files: any;
}

const loadImage = (req: Request) => {
    const image = (req as RequestFiles).files?.image;
    if (!image) {
        throw new Error("No file uploaded");
    }
    return image;
};

export class ImageController {
    async getMetadata(req: Request, res: Response) {
        try {
            const image = loadImage(req);
            const metadata = await imageService.imageMetadata(image.data);
            return res.json(metadata);
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: String(error) });
        }
    }

    async resizeImage(req: Request, res: Response) {
        try {
            const image = loadImage(req);
            const { width, height } = req.body;
            const resizedImage = await imageService.resizeImage(
                image.data,
                +width,
                +height
            );
            const readStream = new stream.PassThrough();

            readStream.end(resizedImage);
            res.set("Content-Type", "image/jpeg");
            readStream.pipe(res);

            return;
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: String(error) });
        }
    }

    async compressImage(req: Request, res: Response) {
        try {
            const image = loadImage(req);
            const compressedImage = await imageService.compressImage(
                image.data
            );
            const readStream = new stream.PassThrough();

            readStream.end(compressedImage);
            res.set("Content-Type", "image/jpeg");
            readStream.pipe(res);

            return;
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: String(error) });
        }
    }

    async cropImage(req: Request, res: Response) {
        try {
            const image = loadImage(req);
            const { width, height, left, top } = req.body;
            const croppedImage = await imageService.cropImage(
                image.data,
                +width,
                +height,
                +left,
                +top
            );
            const readStream = new stream.PassThrough();

            readStream.end(croppedImage);
            res.set("Content-Type", "image/jpeg");
            readStream.pipe(res);

            return;
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: String(error) });
        }
    }

    async grayscaleImage(req: Request, res: Response) {
        try {
            const image = loadImage(req);
            const grayscaledImage = await imageService.grayscaleImage(
                image.data
            );
            const readStream = new stream.PassThrough();

            readStream.end(grayscaledImage);
            res.set("Content-Type", "image/jpeg");
            readStream.pipe(res);

            return;
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: String(error) });
        }
    }

    async blurImage(req: Request, res: Response) {
        try {
            const image = loadImage(req);
            const { sigma } = req.body;
            const blurredImage = await imageService.blurImage(
                image.data,
                +sigma
            );
            const readStream = new stream.PassThrough();

            readStream.end(blurredImage);
            res.set("Content-Type", "image/jpeg");
            readStream.pipe(res);

            return;
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: String(error) });
        }
    }

    async composeImages(req: Request, res: Response) {
        try {
            const image = loadImage(req);
            const frontImage = (req as RequestFiles).files?.front;
            if (!frontImage) {
                throw new Error("No file uploaded");
            }
            const { top = 0, left = 0 } = req.body;
            const composedImage = await imageService.composeImages(
                image.data,
                frontImage.data,
                +top,
                +left
            );
            const readStream = new stream.PassThrough();

            readStream.end(composedImage);
            res.set("Content-Type", "image/jpeg");
            readStream.pipe(res);

            return;
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: String(error) });
        }
    }

    async addTextToImage(req: Request, res: Response) {
        try {
            const image = loadImage(req);
            const { text, fontSize = 72, color = "#fff" } = req.body;
            const editedImage = await imageService.addTextToImage(
                image.data,
                text,
                fontSize,
                color
            );
            const readStream = new stream.PassThrough();

            readStream.end(editedImage);
            res.set("Content-Type", "image/jpeg");
            readStream.pipe(res);

            return;
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: String(error) });
        }
    }
}
