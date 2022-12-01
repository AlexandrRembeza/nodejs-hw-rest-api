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
} = require('../../controllers/userControllers');

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

module.exports = router;
