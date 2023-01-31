const Message = require("../models/message");
const newMessageTemplates = require("../utils/nodemailer/template/newMessage");
const transporter = require("../utils/nodemailer/transporter");

export const newMessage = async (req, res, next) => {
  try {
    const message = new Message(req.body);
    const savedMessage = await message.save();
    const output1 = newMessageTemplates.newMessageTemplate(
      req.body.nom,
      req.body.prenom,
      req.body.mail,
      req.body.message
    );
    const output2 = newMessageTemplates.senderNewMessage();

    const mailSent = await transporter.sendMail({
      from: req.body.mail,
      to: "test@sanlamamba.com",
      subject: req.body.sujet,
      text: "Nouveau Message",
      html: output1,
    });

    const mailSent2 = await transporter.sendMail({
      from: "test@sanlamamba.com",
      to: req.body.mail,
      subject: req.body.sujet,
      text: "Mams : Votre message a été envoyé",
      html: output2,
    });

    res.status(201).json({
      message: "Message successfully created",
      data: savedMessage,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error sending message",
      data: err,
    });
  }
};

export const testMail = async (req, res, next) => {
  const { from, toEmail, subject, message } = req.body;
  console.log(from, toEmail, subject, message);
  try {
    const mailSent = await transporter.sendMail({
      from: from,
      to: toEmail,
      subject: subject,
      text: message,
      // html: html,
    });

    console.log(mailSent);
    res.status(200).json({
      message: "Mail sent successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error Sending Mail",
      data: err,
    });
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find();
    res.status(200).json({
      message: "Messages fetched successfully",
      data: messages.sort((a, b) => b.createdAt - a.createdAt),
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching messages",
      data: err,
    });
  }
};

export const getNewMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({ isRead: false });
    res.status(200).json({
      message: "Messages fetched successfully",
      data: messages,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching messages",
      data: err,
    });
  }
};

export const getMessagesByEmail = async (req, res, next) => {
  try {
    const messages = await Message.find({ email: req.params.email });
    res.status(200).json({
      message: "Messages fetched successfully",
      data: messages,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching messages",
      data: err,
    });
  }
};

export const setMessageReadByID = async (req, res, next) => {
  try {
    const message = await Message.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: {
          read: true,
        },
      }
    );

    res.status(200).json({
      message: "Message updated successfully",
      data: message,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating message",
      data: err,
    });
  }
};

export const countUnreadMessages = async (req, res, next) => {
  try {
    // find the count of messages with read value as false
    Message.countDocuments({ read: false }).exec((err, count) => {
      if (err) {
        res.send(err);
        return;
      }

      res.json({
        message: "Messages fetched successfully",
        data: count,
      });
    });
  } catch (e) {
    res.status(500).json({
      message: "Error counting unread message",
      data: e,
    });
  }
};
