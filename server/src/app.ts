import express from "express";
import cors from "cors";
import mainRoute from "./routes/mainRoute.ts";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api', mainRoute);

export default app;