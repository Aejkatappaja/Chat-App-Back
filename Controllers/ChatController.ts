import Chat from "../Models/ChatModel";
import express, { Request, Response } from "express";

export const createChat = async (req: Request, res: Response) => {
  const { senderId, receiverId } = req.body;
  const newChat = new Chat({
    members: [senderId, receiverId],
  });
  try {
    const result = await newChat.save();
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
