import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/api', (req, res) => {
    res.send("Server is running.");
});

export default app;