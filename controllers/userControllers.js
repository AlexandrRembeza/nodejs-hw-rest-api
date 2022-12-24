const bcrypt = require('bcrypt');
const shortid = require('shortid');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const {
  registerUser,
  findUserByEmail,
  changeSubscription,
  replaceAvatar,
  findUserByToken,
  changeVerifyStatus,
} = require('../service/userServices');
const modifyImage = require('../helpers/jimpHelper');
const sendEmailMsg = require('../helpers/nodemailerEmailMsg');
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

  const verificationToken = shortid.generate();
  sendEmailMsg(body.email, verificationToken);

  const { email, subscription } = await registerUser({
    ...body,
    password: hash,
    verificationToken,
  });
  res.status(201).json({ user: { email, subscription } });
};

const verifyEmail = async ({ params: { verificationToken } }, res) => {
  const user = await findUserByToken(verificationToken);
  if (!user) return res.status(404).json({ message: 'Not Found' });
  await changeVerifyStatus(user._id);
  res.status(200).json({ message: 'Verification successful' });
};

const reVerifyEmail = async ({ body: { email } }, res) => {
  const user = await findUserByEmail(email);
  if (!user) return res.status(400).json(`Not user with email: ${email}`);
  if (user.verify) return res.status(400).json('Verification has already been passed');
  sendEmailMsg(user.email, user.verificationToken);
  res.status(200).json({ message: 'Verification email sent' });
};

const logInUser = async ({ body }, res) => {
  const user = await findUserByEmail(body.email);
  if (!user) return res.status(401).json({ message: 'Email is wrong' });

  const isCorrectPassword = bcrypt.compareSync(body.password, user.password);
  if (!isCorrectPassword) return res.status(401).json({ message: 'Password is wrong' });

  if (!user.verify) return res.status(401).json({ message: 'Not verified' });

  const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1y' });
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
  const filePath = await modifyImage(originalname, path);
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
  verifyEmail,
  reVerifyEmail,
};
