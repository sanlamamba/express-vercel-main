const expres = require("express");
const fileManager = require("../utils/fileManager");
const multerConfig = require("../utils/multer/multerConfig");
const { musicRemover, videoRemover, fileRemover } = fileManager;

const ENDPOINT = "music";
const router = express.Router();
const multer = require("multer");

const upload = multer(multerConfig);

const musicController = require("../controllers/music");

router.get(`/${ENDPOINT}/`, musicController.getAllMusic);
router.get(`/${ENDPOINT}/:id`, musicController.getMusic);

router.post(
  `/${ENDPOINT}/upload-music`,
  // requireToken,
  upload.single("music"),
  musicController.uploadMusic
);
router.delete(
  `/${ENDPOINT}/delete-music/`,
  musicRemover,
  musicController.removeMusic
);

router.post(`/${ENDPOINT}/new`, musicController.createMusic);
router.put(`/${ENDPOINT}/:id`, musicController.updateMusic);
router.put(`/${ENDPOINT}/:id/incrementRead`, musicController.incrementRead);
router.delete(`/${ENDPOINT}/delete/`, musicController.deleteMusic);

module.exports = router;
