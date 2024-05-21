const { Message } = require("../models");

class Message_ctrl {
  //* ─── Send Message ────────────────────────────────────────────────────
  static async sendMessage(req, res, next) {
    try {
      const { message } = req.body;
      const { id: ReceiverId } = req.params;
      const { id: SenderId } = req.user;

      const newMessage = await Message.create({
        messages: message,
        SenderId,
        ReceiverId,
      });

      res.status(201).json({ newMessage });
    } catch (error) {
      console.log("🚀 ~ Message_ctrl ~ sendMessage ~ error:", error);
      next(error);
    }
  }
}

module.exports = Message_ctrl;
