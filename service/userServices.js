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

module.exports = {
  registerUser,
  findUserByEmail,
  findUserById,
  changeSubscription,
  replaceAvatar,
};
