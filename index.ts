import express, { Express, Request, Response } from "express";
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();
dotenv.config({ path: "./.env" });

const app: Express = express();
const port = process.env.PORT;
const uri = process.env.MONGODB_URI;
const user = require("./Routes/User");

mongoose.connect(uri);
app.use(express.json());
app.use(cors());
app.use(user);

app.get("/", (req: Request, res: Response) => {
  res.send("Chat App");
});

app.listen(port, () => {
  console.log(`[server]: Server is now running at 🚀 http://localhost:${port}`);
});
