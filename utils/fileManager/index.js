const fs = require("fs");
const path = require("path");

const imageRemover = async (req, res, next, image) => {
  console.log("I was here");
  console.log(req.body);
  const file = req.body.image || req.params.image || req.query.image || image;
  console.log(file);
  const path = "public/images/" + file;
  fs.unlink(path, (err) => {
    if (err) {
      return res.status(500).json({
        message: "Error deleting image.",
        error: err,
      });
    }
    next();
  });
};
const musicRemover = async (req, res, next) => {
  console.log(req);
  const file = req.body.music || req.params.music || req.query.music;
  const path = "public/music/" + file;
  fs.unlink(path, (err) => {
    if (err) {
      return res.status(500).json({
        message: "Error deleting music.",
        error: err,
      });
    }
    next();
  });
};

const videoRemover = async (req, res, next, video) => {
  console.log("I was here");
  const file = req.body.video || req.params.video || req.query.video || video;
  const path = "public/videos/" + file;
  fs.unlink(path, (err) => {
    if (err) {
      return res.status(500).json({
        message: "Error deleting video.",
        error: err,
      });
    }
    next();
  });
};

const fileRemover = async (req, res, next) => {
  const path = "public/files/" + req.body.file;
  fs.unlink(path, (err) => {
    if (err) {
      return res.status(500).json({
        message: "Error deleting file.",
        error: err,
      });
    }
    next();
  });
};

const fileManager = {
  imageRemover,
  videoRemover,
  fileRemover,
  musicRemover,
};

module.exports = fileManager;
