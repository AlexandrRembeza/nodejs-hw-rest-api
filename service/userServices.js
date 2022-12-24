const User = require('./schemas/userModel');

const registerUser = async userData => {
  return await User.create({ ...userData });
};

const findUserByEmail = async email => {
  return await User.findOne({ email });
};

const findUserById = async userId => {
  return await User.findById(userId);
};

const changeSubscription = async (id, subscription) => {
  return await User.findByIdAndUpdate(id, { subscription }, { new: true });
};

const replaceAvatar = async (id, avatarURL) => {
  return await User.findByIdAndUpdate(id, { avatarURL }, { new: true });
};

const findUserByToken = async verificationToken => {
  return await User.findOne({ verificationToken });
};

const changeVerifyStatus = async _id => {
  return await User.findByIdAndUpdate(_id, { verify: true, verificationToken: 'null' });
};

module.exports = {
  registerUser,
  findUserByEmail,
  findUserById,
  changeSubscription,
  replaceAvatar,
  findUserByToken,
  changeVerifyStatus,
};
