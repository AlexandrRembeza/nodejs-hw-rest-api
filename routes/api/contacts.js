const express = require('express');
const { isValidId, validateBody } = require('../../middlewares/validationMiddlewares');
const {
  addContactValidationSchema,
  updateContactValidationSchema,
  updateStatusContactValidationSchema,
} = require('../../middlewares/validationSchemas/contactsSchemas');
const {
  getAllContacts,
  getContactById,
  deleteContactById,
  addNewContact,
  updateContactById,
} = require('../../controllers/contactsControllers');
const { asyncWrapper } = require('../../helpers/apiHelpers');
const { authMiddleware } = require('../../middlewares/validationMiddlewares');

const router = express.Router();

router.use(authMiddleware);

router.get('/', asyncWrapper(getAllContacts));
router.get('/:contactId', isValidId, asyncWrapper(getContactById));
router.post('/', validateBody(addContactValidationSchema), asyncWrapper(addNewContact));
router.delete('/:contactId', isValidId, asyncWrapper(deleteContactById));
router.put(
  '/:contactId',
  isValidId,
  validateBody(updateContactValidationSchema),
  asyncWrapper(updateContactById)
);
router.patch(
  '/:contactId/favorite',
  isValidId,
  validateBody(updateStatusContactValidationSchema),
  asyncWrapper(updateContactById)
);

module.exports = router;
