import { Request, Response } from "express";

export class RootController {
    async redirectToDocs(req: Request, res: Response) {
        try {
            res.redirect("https://github.com/cheatsnake/sharper");
        } catch (error) {
            console.log(error);
        }
    }
}

export default RootController;
