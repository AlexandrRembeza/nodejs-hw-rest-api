const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./service/schemas/userModel');
const { logInUser } = require('./controllers/userControllers');

const secret = process.env.SECRET;

const mRes = (function mockResponse() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
})();

const mReq = {
  body: {
    email: 'abcdef@mail.com',
    password: '12345',
  },
};

const mUser = {
  _id: '1',
  password: mReq.body.password,
  email: mReq.body.email,
  subscription: 'starter',
};

describe('logIn controller tests', () => {
  test('should 200, return token and user(email, subscription)', async () => {
    const token = jwt.sign({ id: mUser._id }, secret, { expiresIn: '1y' });

    jest.spyOn(User, 'findOne').mockImplementation(async () => await mUser);
    jest.spyOn(bcrypt, 'compareSync').mockImplementation(() => true);

    await logInUser(mReq, mRes);

    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.json).toBeCalledWith({
      token,
      user: { email: mUser.email, subscription: mUser.subscription },
    });
  });
  test('should 401 and message "Email is wrong"', async () => {
    const mUser = null;

    jest.spyOn(User, 'findOne').mockImplementation(async () => await mUser);

    await logInUser(mReq, mRes);

    expect(mRes.status).toBeCalledWith(401);
    expect(mRes.json).toBeCalledWith({ message: 'Email is wrong' });
  });
  test('should 401 and message "Password is wrong"', async () => {
    jest.spyOn(User, 'findOne').mockImplementation(async () => await mUser);
    jest.spyOn(bcrypt, 'compareSync').mockImplementation(() => false);

    await logInUser(mReq, mRes);

    expect(mRes.status).toBeCalledWith(401);
    expect(mRes.json).toBeCalledWith({ message: 'Password is wrong' });
  });
});
