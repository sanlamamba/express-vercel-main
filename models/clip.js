const mongoose = require("mongoose");
const { Schema } = mongoose;

const ClipSchema = new Schema(
  {
    video: {
      path: { type: String, required: true },
    },
    image: {
      path: { type: String, required: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Clip", ClipSchema);
