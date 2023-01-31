const fs = require("fs");
const Music = require("../models/music");
const slugify = require("slugify");
const musicRemover = async (music) => {
  const path = "public/music/" + music;
  await fs.unlink(path, (err) => {
    if (err) {
      return false;
    }
    return true;
  });
};

const getAllMusic = async (req, res) => {
  try {
    const music = await Music.find({});
    res.status(200).json({
      message: "Music Fetched",
      data: music,
    });
  } catch (e) {
    res.status(500).json({
      message: "Error uploading image",
      error: e,
    });
  }
};

const getMusic = async (req, res, next) => {
  try {
    console.log("asdad");
    console.log(req.params.id);
    const music = await Music.findById(req.params.id);
    console.log(music);

    res.status(200).json({
      message: "Music fetched successfully",
      data: music,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error Fetching Music",
      data: err,
    });
  }
};

const uploadMusic = async (req, res, next) => {
  try {
    const music = req.file;
    res.status(200).json({
      message: "Music uploaded successfully",
      path: `${music.filename}`,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error uploading image",
      error: err,
    });
  }
};

const removeMusic = async (req, res, next) => {
  try {
    res.status(200).json({
      message: "Music Deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error uploading image",
      error: err,
    });
  }
};

const createMusic = async (req, res, next) => {
  // try {
  const musicFile = new Music({
    title: req.body.title,
    audio: req.body.audio,
    slug: slugify(req.body.title + "-" + Date.now(), { lower: true }),
  });
  await musicFile.save();
  res.status(200).json({
    message: "Music uploaded successfully ",
    data: musicFile,
  });
  // } catch (err) {
  // res.status(500).json({
  //   message: "Error uploading image",
  //   error: err,
  // });
  // }
};

const getImages = async (req, res, next) => {
  try {
    const images = await Image.find();
    images.sort((a, b) => b.createdAt - a.createdAt);
    res.status(200).json({
      message: "Images fetched successfully",
      data: images,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching images",
      error: err,
      data: null,
    });
  }
};

const createCourse = async (req, res, next) => {
  // try {
  const alreadyExists = await Course.findOne({
    slug: slugify(req.body.title, { lower: true }),
    instructor: req.user._id,
  });
  if (alreadyExists) {
    return res.status(400).json({
      message: "Course already exists",
    });
  }
  const course = new Course({
    slug: slugify(req.body.title, { lower: true }),
    instructor: req.user._id,
    ...req.body,
  });
  await course.save();
  res.status(200).json({
    message: "Course created successfully",
  });
};

const viewCourse = async (req, res, next) => {
  try {
    const course = await Course.findOne({ slug: req.body.slug })
      .populate("instructor", "_id name")
      .exec();
    if (!course) {
      return res.status(400).json({
        message: "Course not found",
      });
    }
    res.status(200).json({
      message: "Course found",
      course,
    });
  } catch (e) {
    res.status(500).json({
      message: "Error fetching course.",
      error: e,
    });
  }
};

const removeImage = async (req, res, next) => {
  try {
    const imageId = req.params.id;
    // console.log(`Removing ${imageId}`);
    const deletedImage = await Image.findByIdAndDelete(imageId);
    res.status(200).json({
      message: "Image deleted successfully",
      data: deletedImage,
    });
  } catch (e) {
    res.status(500).json({
      message: "Error deleting image.",
      error: e,
    });
  }
};

const uploadVideo = async (req, res, next) => {
  try {
    const video = req.file;
    res.status(200).json({
      message: "Video uploaded successfully",
      path: `${video.filename}`,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error uploading Video",
      error: err,
    });
  }
};

const removeVideo = async (req, res, next) => {
  try {
    res.status(200).json({
      message: "Video deleted successfully",
    });
  } catch (e) {
    res.status(500).json({
      message: "Error deleting Video.",
      error: e,
    });
  }
};

const updateMusic = async (req, res, next) => {
  try {
    const updatedMusic = await Music.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({
      message: "Music deleted successfully",
      data: updatedMusic,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting Music",
      data: err,
    });
  }
};

const deleteMusic = async (req, res, next) => {
  try {
    const music = await Music.find({ _id: req.query.id });
    const file = music[0].audio;

    await musicRemover(file);
    const deletedMusic = await Music.deleteOne({ _id: req.query.id });

    res.status(200).json({
      message: "Clip deleted successfully",
      data: deletedMusic,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting music",
      data: err,
    });
  }
};

const incrementRead = async (req, res, next) => {
  try {
    const music = await Music.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $inc: { "meta.read": 1 },
      }
    );
    res.status(200).json({
      message: "Music read incremented successfully",
      data: music,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting Music",
      data: err,
    });
  }
};

module.exports = {
  getAllMusic,
  getMusic,
  uploadMusic,
  removeMusic,
  createMusic,
  getImages,
  createCourse,
  viewCourse,
  removeImage,
  uploadVideo,
  removeVideo,
  updateMusic,
  deleteMusic,
  incrementRead,
};
