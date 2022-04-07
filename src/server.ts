import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import apiRouter from "./routes/api.router";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(fileUpload({}));

app.use("/api", apiRouter);
app.use("/", (req, res) => {
    res.redirect("https://github.com/cheatsnake");
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));

export default app;
