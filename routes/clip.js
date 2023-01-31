const express = require("express");
const fileManager = require("../utils/fileManager");
const multerConfig = require("../utils/multer/multerConfig");

const { imageRemover, videoRemover, fileRemover } = fileManager;

const ENDPOINT = "clip";
const router = express.Router();
const multer = require("multer");

const upload = multer(multerConfig);

const clipController = require("../controllers/clip");

router.get(`/${ENDPOINT}/`, clipController.getAllClips);
router.get(`/${ENDPOINT}/:id`, clipController.getClip);
router.post(`/${ENDPOINT}/new`, clipController.createClip);
router.post(
  `/${ENDPOINT}/upload-image`,
  // requireToken,
  upload.single("image"),
  clipController.uploadImage
);

router.delete(
  `/${ENDPOINT}/delete-image/`,
  imageRemover,
  clipController.deleteImage
);

router.post(
  `/${ENDPOINT}/upload-video`,
  upload.single("video"),
  clipController.uploadVideo
);

router.delete(
  `/${ENDPOINT}/delete-video/`,
  videoRemover,
  clipController.deleteVideo
);
router.delete(`/${ENDPOINT}/delete/`, clipController.deleteClip);
router.put(`/${ENDPOINT}/:id`, clipController.updateClip);

module.exports = router;
