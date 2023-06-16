"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ChatController_1 = require("./Controllers/ChatController");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
dotenv.config();
dotenv.config({ path: "./.env" });
const chat = require("./Routes/ChatRoute");
const app = (0, express_1.default)();
const port = process.env.PORT;
const uri = process.env.MONGODB_URI;
mongoose.connect(uri);
app.use(express_1.default.json());
app.use(cors());
app.use(chat, ChatController_1.createChat);
app.get("/", (req, res) => {
    res.send("Chat App");
});
app.listen(port, () => {
    console.log(`[server]: Server is now running at 🚀 http://localhost:${port}`);
});
