const { HttpError, ctrlWrapper } = require("../helpers");
const { Contact } = require("../models/contact");
const { schemas } = require("../models/contact");

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({owner},"-createdAt -updatedAt",{skip, limit}).populate("owner","email");
  res.json(result);
};
const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw new HttpError(404, "Contact not found");
  }
  res.json(result);
};
const add = async (req, res) => {
  const { _id: owner } = req.user;
  const { error } = schemas.addSchema.validate(res.body);
  if (error) {
    throw new HttpError(404, "Contact not found");
  }
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};
const deleteById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw new HttpError(404, "Contact not found");
  }
  res.json({ message: "Delete success" });
};
const updateById = async (req, res, next) => {
  const { error } = schemas.addSchema.validate(res.body);
  if (error) {
    throw new HttpError(400, error.message);
  }
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw new HttpError(404, "Contact not found");
  }
  res.json(result);
};
const updateStatusContact = async (req, res, next) => {
  const { error } = schemas.updateFavoriteSchema.validate(res.body);
  if (error) {
    throw new HttpError(400, error.message);
  }
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw new HttpError(404, "Contact not found");
  }
  res.status(200).json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
