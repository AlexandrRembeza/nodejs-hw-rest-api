const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const {
  registerUser,
  findUserByEmail,
  changeSubscription,
  replaceAvatar,
} = require('../service/userServices');
const modifiedImage = require('../helpers/jimpHelper');
require('dotenv').config();

const secret = process.env.SECRET;

const signUpUser = async ({ body }, res) => {
  const user = await findUserByEmail(body.email);

  if (user)
    return res.status(409).json({
      message: 'Email in use',
    });

  body.avatarURL = gravatar.url(body.email, { protocol: 'http', s: '300' });
  const hash = bcrypt.hashSync(body.password, bcrypt.genSaltSync(8));

  const { email, subscription } = await registerUser({ ...body, password: hash });
  res.status(201).json({ user: { email, subscription } });
};

const logInUser = async ({ body }, res) => {
  const user = await findUserByEmail(body.email);
  if (!user) return res.status(401).json({ message: 'Email is wrong' });

  const isCorrectPassword = bcrypt.compareSync(body.password, user.password);
  if (!isCorrectPassword) return res.status(401).json({ message: 'Password is wrong' });

  const payload = { id: user._id };
  const token = jwt.sign(payload, secret, { expiresIn: '1y' });
  res.status(200).json({ token, user: { email: user.email, subscription: user.subscription } });
};

const logOutUser = async (_, res) => {
  res.status(204).end();
};

const getCurrentUser = async ({ user: { email, subscription } }, res) => {
  res.status(200).json({ email, subscription });
};

const changeUserSubscription = async ({ body, user }, res) => {
  const { email, subscription } = await changeSubscription(user._id, body.subscription);
  res.status(200).json({ email, subscription });
};

const replaceUserAvatar = async ({ user, file: { originalname, path } }, res) => {
  const filePath = await modifiedImage(originalname, path);
  const { avatarURL } = await replaceAvatar(user._id, filePath);
  res.status(200).json({ avatarURL });
};

module.exports = {
  signUpUser,
  logInUser,
  logOutUser,
  getCurrentUser,
  changeUserSubscription,
  replaceUserAvatar,
};
