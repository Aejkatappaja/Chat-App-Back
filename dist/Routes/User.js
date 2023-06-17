"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const SHA256 = require("crypto-js/sha256");
const BASE64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");
const User_1 = __importDefault(require("../Models/User"));
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, nickname, password } = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(406).send({ message: "Invalid e-mail address" });
        }
        const emailAlreadyExists = yield User_1.default.findOne({ email: email });
        if (!email || !nickname || !password) {
            return res.status(406).send({ message: "something is missing !" });
        }
        else if (emailAlreadyExists) {
            return res
                .status(406)
                .send({ message: "An account with this e-mail already exists" });
        }
        else if (!password) {
            return res.status(406).send({ message: "You must create a password !" });
        }
        else {
            const salt = uid2(16);
            const hash = SHA256(salt + password).toString(BASE64);
            const token = uid2(64);
            const newUser = new User_1.default({
                email: email,
                nickname: nickname,
                token: token,
                hash: hash,
                salt: salt,
            });
            yield newUser.save();
            console.log(newUser);
            res.status(200).json(newUser);
        }
    }
    catch (error) {
        console.log(error);
        res.status(406).json({ message: error });
    }
}));
module.exports = router;
