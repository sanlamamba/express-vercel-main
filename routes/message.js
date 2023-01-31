const express = require("express");
const ENDPOINT = "message";
const router = express.Router();

const messageController = require("../controllers/message");

router.post(`/${ENDPOINT}/new`, messageController.newMessage);

router.get(`/${ENDPOINT}`, messageController.getMessages);
router.put(`/${ENDPOINT}/read/:id`, messageController.setMessageReadByID);

router.get(`/${ENDPOINT}/unread/count`, messageController.countUnreadMessages);
module.exports = router;
