const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const authMiddleware = require("./middleware");

const PORT = 5601;

app.use(express.json());
app.get("/", (req, res) => {
    res.json(messages);
});

const messages = [];

app.post("/git-info", authMiddleware, (req, res) => {
    const data = req.body;

    messages.push(data);
    res.status(200).json({message: "Webhook received"});
});

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});
