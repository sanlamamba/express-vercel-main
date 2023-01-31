const Image = require("../models/image");
const slugify = require("slugify");

const uploadImage = async (req, res, next) => {
  try {
    const image = req.file;
    console.log(image);

    const imageFile = new Image({
      path: image.filename,
    });
    await imageFile.save();
    res.status(200).json({
      message: "Image uploaded successfully",
      data: imageFile,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error uploading image",
      error: err,
    });
  }
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

// export const updateLesson = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
//     const { title, content, video } = req.body;
//     console.table(req.body);
//     // check if lesson with slug exists

//     const course = await Course.findOneAndUpdate(
//       { slug },
//       {
//         $push: {
//           lessons: {
//             title,
//             content,
//             video,
//             slug: slugify(title, { lower: true }),
//           },
//         },
//       },
//       { new: true }
//     ).exec();
//     if (!course) {
//       return res.status(400).json({
//         message: "Course not found",
//       });
//     }
//     res.status(200).json({
//       message: "Lesson created successfully",
//       course,
//     });
//   } catch (e) {
//     res.status(500).json({
//       message: "Error creating lesson. 222",
//       error: e,
//     });
//   }
// };
// export const updateLesson = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
//     const { title, video, } = req.body;
//     const course = await Course.findOneAndUpdate(
//       { slug },
//       {
//         $set: {
//           content,
//         },
//       },
//       { new: true }
//     ).exec();
//     if (!course) {
//       return res.status(400).json({
//         message: "Course not found",
//       });
//     }
//     res.status(200).json({
//       message: "Lesson updated successfully",
//       course,
//     });
//   } catch (e) {
//     res.status(500).json({
//       message: "Error updating Lesson.",
//       error: e,
//     });
//   }
// };

module.exports = {
  uploadImage,
  getImages,
  createCourse,
  viewCourse,
  removeImage,
  uploadVideo,
  removeVideo,
};
