const { throwParameterError } = require('../helpers/apiHelpers');
const {
  getContacts,
  getContact,
  removeContact,
  addContact,
  updateContact,
} = require('../service/contactsServices');

const getAllContacts = async ({ query, user }, res) => {
  res.status(200).json({ contacts: await getContacts(query, user._id) });
};

const getContactById = async ({ params: { contactId }, user }, res) => {
  const contact = await getContact(contactId, user._id);
  if (!contact) return throwParameterError(contactId);
  res.status(200).json({ contact });
};

const addNewContact = async ({ body, user }, res) => {
  res.status(201).json({ contact: await addContact(body, user._id) });
};

const deleteContactById = async ({ params: { contactId }, user }, res) => {
  const contact = await removeContact(contactId, user._id);
  if (!contact) return throwParameterError(contactId);
  res.status(200).json({ message: 'contact deleted' });
};

const updateContactById = async ({ params: { contactId }, body, user }, res) => {
  const contact = await updateContact(contactId, user._id, body);
  if (!contact) return throwParameterError(contactId);
  res.status(200).json({ contact });
};

module.exports = {
  getAllContacts,
  getContactById,
  deleteContactById,
  addNewContact,
  updateContactById,
};
