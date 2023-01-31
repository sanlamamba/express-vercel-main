const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 1000,
      trim: true,
    },
    sujet: {
      type: String,
      required: true,
      minlength: 1,
      default: "Message",
      trim: true,
    },
    read: {
      type: Boolean,
      required: true,
      default: false,
    },
    nom: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 1000,
      trim: true,
    },
    prenom: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 1000,
      trim: true,
    },
    mail: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 1000,
      trim: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
      lowercase: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
