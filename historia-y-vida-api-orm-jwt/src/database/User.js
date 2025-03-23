const { User } = require("../models/users.model");

const getOneUser = async (email) => {
  try {
    const user = await User.findOne({ where: { email: email } });
    return user;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};
const updateOneUser = async (id, changes) => {
  try {
    const updatedUser = await User.update(changes, {
      where: { id: id },
    });
    return updatedUser;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};
const createNewUser = async (newUser) => {
  try {
    const createdUser = await User.create(newUser);
    return createdUser;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

module.exports = { createNewUser, getOneUser, updateOneUser };
