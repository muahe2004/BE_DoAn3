const axios = require("axios");

exports.handleChat = async (req, res) => {
  const { contents } = req.body;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      { contents },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const botReply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "Không có phản hồi.";
    res.json({ reply: botReply });

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Lỗi khi gọi Gemini API", detail: err.response?.data });
  }
};
