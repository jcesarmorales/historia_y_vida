const dotenv = require("dotenv");
const User = require("../database/User");
const jwt = require("jsonwebtoken");

dotenv.config();

const signIn = async (params) => {
  try {
    const user = await User.getOneUser(params.email);
    if (!user) {
      throw new Error("User do not exist!");
    } else {
      if (user.password !== params.password) {
        throw new Error("Password do not match!");
      } else {
        const token = jwt.sign({ user }, process.env.JWT_SECRET);
        return { userId: user.id, username: user.username ,lastName: user.lastName,email: user.email ,address: user.address,phone: user.phone ,userRole: user.role, token };
      }
    }
  } catch (error) {
    throw error;
  }
};

const updateOneUser= async (id, changes) => {
  
  try {
    const updatedUser = await User.updateOneUser(id, changes);
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

const signUp = async (params) => {
  try {
    const user = await User.createNewUser(params);
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  signIn,
  signUp,
  updateOneUser,
};
