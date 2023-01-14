const shortid = require('shortid');
const { WrongImageError } = require('./errors');
const Jimp = require('jimp');
const path = require('path');

const modifyImage = async (avatar, avatarPath) => {
  const avatarFormat = avatar.slice(avatar.indexOf('.') + 1);
  const avatarName = avatar.slice(0, avatar.indexOf('.'));
  const id = shortid.generate();
  const newFileName = `${avatarName}_${id}_h=250&w=250.${avatarFormat}`;

  const newFilePath = path.join(process.cwd(), 'public', 'avatars', `${newFileName}`);
  try {
    const image = await Jimp.read(avatarPath);
    image.resize(250, 250).write(newFilePath);
  } catch (err) {
    throw new WrongImageError('Failed, image is unvalid');
  }
  return path.join('avatars', `${newFileName}`);
};

module.exports = modifyImage;
