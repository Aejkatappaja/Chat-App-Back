import express, { Request, Response } from "express";
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const BASE64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

import User from "../Models/User";

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(406).send({ message: "Invalid e-mail address" });
    }

    const emailAlreadyExists = await User.findOne({ email: email });

    if (!email || !username || !password) {
      return res.status(406).send({ message: "Something is missing !" });
    } else if (emailAlreadyExists) {
      return res
        .status(406)
        .send({ message: "An account with this e-mail already exists" });
    } else if (!password) {
      return res.status(406).send({ message: "You must create a password !" });
    } else {
      const salt = uid2(16);
      const hash = SHA256(salt + password).toString(BASE64);
      const token = uid2(64);

      const newUser = new User({
        email: email,
        username: username,
        token: token,
        hash: hash,
        salt: salt,
      });

      await newUser.save();

      console.log("new User --->", newUser);
      res.status(200).json(newUser);
    }
  } catch (error) {
    console.log(error);
    res.status(406).json({ message: error });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "Something went wrong" });
    }
    const newHash = SHA256(user.salt + password).toString(BASE64);
    if (newHash !== user.hash) {
      return res.status(401).json({ message: "Something went wrong" });
    }

    res.status(200).json({
      _id: user._id,
      token: user.token,
      username: user.username,
      email: user.email,
    });
  } catch (error: any) {
    res.status(400).json({ message: error });
    console.log(error.message);
  }
});

module.exports = router;
