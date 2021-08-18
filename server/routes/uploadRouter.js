const express = require("express");
const router = express.Router();
const { Routes } = require("../db/models");
const multer = require("multer");
const { Photos, Reviews } = require("../db/models");
const { v4: uuidv4 } = require("uuid");

const DIR = "./public/img";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

router.route("/image").post(upload.single("333"), async (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  const { user_id, routes_id } = req.body;
  try {
    if (user_id && routes_id && req.file) {
      const newPhoto = await Photos.create({
        user_id,
        routes_id,
        original: url + "/img/" + req.file.filename,
        thumbnail: url + "/img/" + req.file.filename,
      });
      res.json({ photo: newPhoto });
    }
  } catch (error) {}
});

router.route("/image/:id").get(async (req, res, next) => {
  const id = req.params.id;
  if (id) {
    try {
      const photos = await Photos.findAll({
        attributes: ["original", "thumbnail"],
        where: { routes_id: id },
        raw: true,
      });
      res.json(photos);
    } catch (error) {}
  }
});

router
  .route("/comment/:id")
  .get(async (req, res, next) => {
    const id = req.params.id;
    try {
      const comment = await Reviews.findAll({
        where: {
          routes_id: id,
        },
        order: [["id", "DESC"]],
      });
      res.json(comment);
    } catch (error) {}
  })
  .post(async (req, res, next) => {
    const id = req.params.id;
    const data = req.body.data;
    const userId = req.body.userId;
    const rating = req.body.rating;
    if (id && data && userId) {
      try {
        const comment = await Reviews.create({
          user_id: userId,
          routes_id: id,
          text: data,
          rating,
        });
        res.json(comment);
      } catch (error) {}
    }
  });
router.route("/comment");

module.exports = router;
