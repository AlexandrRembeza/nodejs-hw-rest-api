const { WrongParametersError } = require('../helpers/errors');
const Contact = require('./schemas/contactModel');

const getContacts = async ({ page, limit, favorite }, owner) => {
  if (page && limit) {
    if (Number(page) && Number(limit)) {
      const pageNum = Number(page);
      const limitNum = Number(limit);
      return await Contact.find({ owner })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum > 3 ? 3 : limitNum);
    }
    throw new WrongParametersError('Invalid request params');
  }

  if (favorite) {
    if (favorite === 'true' || favorite === 'false') {
      return await Contact.find({ favorite, owner });
    }
    throw new WrongParametersError('Invalid request params');
  }

  return await Contact.find({ owner });
};

const getContact = async (_id, owner) => {
  return await Contact.findOne({ _id, owner });
};

const addContact = async (body, owner) => {
  return await Contact.create({ ...body, owner });
};

const removeContact = async (_id, owner) => {
  return await Contact.findOneAndRemove({ _id, owner });
};

const updateContact = async (_id, owner, body) => {
  return await Contact.findOneAndUpdate({ _id, owner }, { ...body }, { new: true });
};

module.exports = {
  getContacts,
  getContact,
  removeContact,
  addContact,
  updateContact,
};
