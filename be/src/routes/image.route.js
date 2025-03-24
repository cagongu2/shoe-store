const express = require("express");
const {
  getAllImages,
  getImageById,
  createImage,
  updateImage,
  deleteImage,
} = require("../controllers/image.controller");

const router = express.Router();

router.get("/", getAllImages);

router.get("/:id", getImageById);

router.post("/", createImage);

router.put("/:id", updateImage);

router.delete("/:id", deleteImage);

module.exports = router;
