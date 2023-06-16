import express, { Express, Request, Response } from "express";
import { createChat } from "./Controllers/ChatController";
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();
dotenv.config({ path: "./.env" });

const chat = require("./Routes/ChatRoute");

const app: Express = express();
const port = process.env.PORT;
const uri = process.env.MONGODB_URI;

mongoose.connect(uri);
app.use(express.json());
app.use(cors());
app.use(chat, createChat);

app.get("/", (req: Request, res: Response) => {
  res.send("Chat App");
});

app.listen(port, () => {
  console.log(`[server]: Server is now running at 🚀 http://localhost:${port}`);
});
