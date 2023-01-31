const express = require("express");
const fileManager = require("../utils/fileManager");
const multerConfig = require("../utils/multer/multer");

const { imageRemover, videoRemover, fileRemover } = fileManager;

const ENDPOINT = "image";
const router = express.Router();
const multer = require("multer");

const upload = multer(multerConfig);

const imageController = require("../controllers/image");

router.post(
  `/${ENDPOINT}/upload-image`,
  // requireToken,
  upload.single("image"),
  imageController.uploadImage
);
router.get(`/${ENDPOINT}/`, imageController.getImages);
router.delete(
  `/${ENDPOINT}/delete-image/:id`,
  imageRemover,
  imageController.removeImage
);
// router.post(
//   `/${ENDPOINT}/upload-video`,
//   upload.single("video"),
//   courseController.uploadVideo
// );
// router.post(
//   `/${ENDPOINT}/remove-video`,
//   requireToken,
//   isInstructor,
//   videoRemover,
//   courseController.removeVideo
// );

// router.post(
//   `/${ENDPOINT}/view`,
//   requireToken,
//   isInstructor,
//   courseController.viewCourse
// );

// router.post(
//   `/${ENDPOINT}/create-course`,
//   requireToken,
//   isInstructor,
//   courseController.createCourse
// );
// router.post(
//   `/${ENDPOINT}/update-course/:slug`,
//   requireToken,
//   isInstructor,
//   courseController.updateCourse
// );
// router.post(
//   `/${ENDPOINT}/create-lesson/:slug`,
//   requireToken,
//   isInstructor,
//   courseController.createLesson
// );

// router.post(
//   `/${ENDPOINT}/lesson/:slug`,
//   requireToken,
//   isInstructor,
//   courseController.createLesson
// );

module.exports = router;
