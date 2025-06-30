const multer = require("multer");
const storage = multer.diskStorage({});

const imagefileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image")) {
    cb("Supported only image files!", false);
  }
  cb(null, true);
};
const videofileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("video")) {
    cb("Supported only image files!", false);
  }
  cb(null, true);
};

exports.uploadImage = multer({ storage, imagefileFilter });
exports.uploadVideo = multer({ storage, videofileFilter });
