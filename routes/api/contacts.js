const express = require('express');
const {
  addContactValidationSchema,
  updateContactValidationSchema,
  updateStatusContactValidationSchema,
  isValidId,
  requestBodyValidation,
} = require('../../middleware/validationsMiddlewares');
const {
  getAllContacts,
  getContactById,
  deleteContactById,
  addNewContact,
  updateContactById,
} = require('../../controllers/contactsControllers');
const { asyncWrapper } = require('../../helpers/apiHelpers');

const router = express.Router();

router.get('/', asyncWrapper(getAllContacts));
router.get('/:contactId', isValidId, asyncWrapper(getContactById));
router.post('/', requestBodyValidation(addContactValidationSchema), asyncWrapper(addNewContact));
router.delete('/:contactId', isValidId, asyncWrapper(deleteContactById));
router.put(
  '/:contactId',
  isValidId,
  requestBodyValidation(updateContactValidationSchema),
  asyncWrapper(updateContactById)
);
router.patch(
  '/:contactId/favorite',
  isValidId,
  requestBodyValidation(updateStatusContactValidationSchema),
  asyncWrapper(updateContactById)
);

module.exports = router;
