"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ChatController_1 = require("../Controllers/ChatController");
const router = express_1.default.Router();
router.post("/", ChatController_1.createChat);
// router.get("/:userId", userChats);
// router.get("/find/:firstId?:secondId", findChat);
exports.default = router;
