import dotenv from "dotenv";
import express, { Application } from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import apiRouter from "./routes/api.router";
import rootRouter from "./routes/root.router";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(fileUpload({}));

app.use("/api", apiRouter);
app.use("*", rootRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));

export default app;
