const { Message, User } = require("../models");
const { getReceiverSocket, io } = require("../sockets/socket");

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

      const receiverSocketId = getReceiverSocket(ReceiverId);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("new message", newMessage);
      }

      res.status(201).json({ newMessage });
    } catch (error) {
      console.log("🚀 ~ Message_ctrl ~ sendMessage ~ error:", error);
      next(error);
    }
  }

  //* ─── Get Message ─────────────────────────────────────────────────────
  static async getMessage(req, res, next) {
    try {
      const { id: ReceiverId } = req.params;
      const { id: SenderId } = req.user;

      const messages = await Message.findAll({
        where: {
          [Op.or]: [
            { SenderId, ReceiverId: ReceiverId },
            { SenderId: ReceiverId, ReceiverId: SenderId },
          ],
        },
        order: [["createdAt", "ASC"]],
        include: [
          { model: User, as: "Sender", attributes: ["username", "fullName"] },
          { model: User, as: "Receiver", attributes: ["username", "fullName"] },
        ],
      });

      res.status(200).json({ messages });
    } catch (error) {
      console.log("🚀 ~ Message_ctrl ~ getMessage ~ error:", error);
      next(error);
    }
  }
}

module.exports = Message_ctrl;
