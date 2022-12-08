const express = require('express');
const {
  requestBodyValidation,
  authMiddleware,
} = require('../../middlewares/validationMiddlewares');
const {
  addUserValidationSchema,
  changeSubscriptionValidationSchema,
} = require('../../middlewares/userSchemas');
const { asyncWrapper } = require('../../helpers/apiHelpers');
const {
  signUpUser,
  logInUser,
  logOutUser,
  getCurrentUser,
  changeUserSubscription,
  replaceUserAvatar,
} = require('../../controllers/userControllers');
const upload = require('../../middlewares/multerMiddleware');

const router = express.Router();

router.post('/signup', requestBodyValidation(addUserValidationSchema), asyncWrapper(signUpUser));
router.post('/login', requestBodyValidation(addUserValidationSchema), asyncWrapper(logInUser));

router.use(authMiddleware);

router.get('/logout', asyncWrapper(logOutUser));
router.get('/current', asyncWrapper(getCurrentUser));
router.patch(
  '/',
  requestBodyValidation(changeSubscriptionValidationSchema),
  asyncWrapper(changeUserSubscription)
);
router.patch('/avatars', upload.single('avatar'), asyncWrapper(replaceUserAvatar));

module.exports = router;
