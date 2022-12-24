const express = require('express');
const { bodyValidation, authMiddleware } = require('../../middlewares/validationMiddlewares');
const {
  addUserValidationSchema,
  changeSubscriptionValidationSchema,
  reVerificationValidationSchema,
} = require('../../middlewares/userSchemas');
const { asyncWrapper } = require('../../helpers/apiHelpers');
const {
  signUpUser,
  verifyEmail,
  logInUser,
  logOutUser,
  getCurrentUser,
  changeUserSubscription,
  replaceUserAvatar,
  reVerifyEmail,
} = require('../../controllers/userControllers');
const upload = require('../../middlewares/multerMiddleware');

const router = express.Router();

router.post('/signup', bodyValidation(addUserValidationSchema), asyncWrapper(signUpUser));
router.get('/verify/:verificationToken', asyncWrapper(verifyEmail));
router.post('/verify', bodyValidation(reVerificationValidationSchema), asyncWrapper(reVerifyEmail));
router.post('/login', bodyValidation(addUserValidationSchema), asyncWrapper(logInUser));

router.use(authMiddleware);

router.get('/logout', asyncWrapper(logOutUser));
router.get('/current', asyncWrapper(getCurrentUser));
router.patch(
  '/',
  bodyValidation(changeSubscriptionValidationSchema),
  asyncWrapper(changeUserSubscription)
);
router.patch('/avatars', upload.single('avatar'), asyncWrapper(replaceUserAvatar));

module.exports = router;
