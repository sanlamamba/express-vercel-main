const mongoose = require("mongoose");

const { Schema } = mongoose;

export const MusicSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
    },
    audio: {
      type: String,
      required: true,
      minlength: 3,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    meta: {
      read: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Music", MusicSchema);
