import express, { Request, Response } from "express";
import { createChat } from "../Controllers/ChatController";

const router = express.Router();

router.post("/", createChat);
// router.get("/:userId", userChats);
// router.get("/find/:firstId?:secondId", findChat);

export default router;
