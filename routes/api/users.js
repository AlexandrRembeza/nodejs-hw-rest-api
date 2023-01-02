const express = require('express');
const { validateBody, authMiddleware } = require('../../middlewares/validationMiddlewares');
const {
  addUserValidationSchema,
  changeSubscriptionValidationSchema,
  reVerificationValidationSchema,
} = require('../../middlewares/validationSchemas/userSchemas');
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

router.post('/signup', validateBody(addUserValidationSchema), asyncWrapper(signUpUser));
router.get('/verify/:verificationToken', asyncWrapper(verifyEmail));
router.post('/verify', validateBody(reVerificationValidationSchema), asyncWrapper(reVerifyEmail));
router.post('/login', validateBody(addUserValidationSchema), asyncWrapper(logInUser));

router.use(authMiddleware);

router.get('/logout', asyncWrapper(logOutUser));
router.get('/current', asyncWrapper(getCurrentUser));
router.patch(
  '/',
  validateBody(changeSubscriptionValidationSchema),
  asyncWrapper(changeUserSubscription)
);
router.patch('/avatars', upload.single('avatar'), asyncWrapper(replaceUserAvatar));

module.exports = router;
