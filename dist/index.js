"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
dotenv.config();
dotenv.config({ path: "./.env" });
const app = (0, express_1.default)();
const port = process.env.PORT;
const uri = process.env.MONGODB_URI;
const user = require("./Routes/User");
mongoose.connect(uri);
app.use(express_1.default.json());
app.use(cors());
app.use(user);
app.get("/", (req, res) => {
    res.send("Chat App");
});
app.listen(port, () => {
    console.log(`[server]: Server is now running at 🚀 http://localhost:${port}`);
});
