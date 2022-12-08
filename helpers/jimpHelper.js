const shortid = require('shortid');
const { WrongImageError } = require('./errors');
const Jimp = require('jimp');
const path = require('path');

const modifyImage = async (avatar, avatarPath) => {
  const avatarFormat = avatar.slice(avatar.indexOf('.') + 1);
  const avatarName = avatar.slice(0, avatar.indexOf('.'));
  const avatarNewPath = path.join(process.cwd(), `/public/avatars/`);

  const filePath = `${avatarNewPath}${avatarName}-${shortid.generate()}-h=250&w=250.${avatarFormat}`;
  try {
    const image = await Jimp.read(avatarPath);
    image.resize(250, 250).write(filePath);
  } catch (err) {
    throw new WrongImageError('Failed, image is unvalid');
  }
  return filePath;
};

module.exports = modifyImage;
