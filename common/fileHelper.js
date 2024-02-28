const multer = require("multer");

const file_size = {
  IMAGE_FILE: 1024 * 1024 * 3, // MAX 3 MB FILE
  THUMBNAIL: 1024 * 1024 * 1, // MAX 1 MB FILE
};

const uploadImage = multer({
  fileFilter: (req, file, next) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      next(null, true);
    } else {
      next(null, false);
    }
  },

  onError: (err, next) => {
    next(err);
  },
});

const uploadThumbnail = multer({
  limits: {
    fileSize: file_size.THUMBNAIL,
  },
  fileFilter: (req, file, next) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      next(null, true);
    } else {
      next(null, false);
    }
  },

  onError: (err, next) => {
    next(err);
  },
});

module.exports = {
  uploadImage,
  file_size,
  uploadThumbnail,
};
