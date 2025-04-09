// routes/chat.route.js
const express = require("express");
const router = express.Router();
const { handleChat } = require("../app/controllers/AI_Chat_Gemini_Ctrl");

router.post("/AIChat", handleChat);

module.exports = router;
