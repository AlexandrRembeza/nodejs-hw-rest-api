const multer = require('multer');
const path = require('path');

const tmpPath = path.join(process.cwd(), 'tmp');

const storage = multer.diskStorage({
  destination(_, __, cb) {
    cb(null, tmpPath);
  },
  filename(_, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
});

module.exports = upload;
