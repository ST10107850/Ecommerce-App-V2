import { JWT_SECRET } from "../constants/env.const.js";
import {
  BAD_REQUEST,
  CONFLICT,
  NOT_FOUND,
  UNAUTHORIZED,
} from "../constants/http.codes.js";
import Users from "../models/userModel.js";
import HttpError from "../utils/HttpError.js";
import { generateToken } from "../utils/generateToken.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const registerUser = async (userData) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    idNumber,
    role,
    password,
    profileImage,
  } = userData;

  const userExist = await Users.findOne({ email, phone, idNumber });
  if (userExist) {
    return new HttpError("User already exists", CONFLICT);
  }

  const newUser = await Users.create({
    firstName,
    lastName,
    email,
    phone,
    idNumber,
    role,
    password,
    profileImage,
  });

  return newUser;
};

export const loginUser = async (userData, res) => {
  const { email, password } = userData;

  const user = await Users.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    throw new HttpError("Invalid email or password", UNAUTHORIZED);
  }

  generateToken(res, user._id);

  const refreshToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: "7d",
  });

  user.refreshToken = refreshToken;
  await user.save();

  return { user, refreshToken };
};

export const getProfile = async (userId) => {
  const user = await Users.findById(userId);

  if (!user) {
    return new HttpError("User not found", NOT_FOUND);
  }

  return user;
};

export const updateProfiles = async (userId, req) => {
  const user = await Users.findById(userId);

  if (!user) {
    throw new HttpError("User not found", NOT_FOUND);
  }

  user.firstName = req.body.firstName || user.firstName;
  user.lastName = req.body.lastName || user.lastName;
  user.email = req.body.email || user.email;
  user.phone = req.body.phone || user.phone;
  user.idNumber = req.body.idNumber || user.idNumber;
  user.profileImage = req.body.profileImage || user.profileImage;

  if (Array.isArray(req.body.address)) {
    req.body.address.forEach((newAddress) => {
      const existingAddressIndex = user.address.findIndex(
        (addr) => addr._id.toString() === newAddress._id
      );

      if (existingAddressIndex !== -1) {
        user.address[existingAddressIndex] = {
          ...user.address[existingAddressIndex],
          ...newAddress,
        };
      } else {
        user.address.push({
          _id: new mongoose.Types.ObjectId(),
          ...newAddress,
        });
      }
    });
  } else if (req.body.address) {
    throw new HttpError("Address must be an array", BAD_REQUEST);
  }

  if (req.body.password) {
    user.password = req.body.password;
  }

  await user.save();
  return user;
};

export const updatePassword = async (
  userId,
  oldPassword,
  newPassword,
) => {
  const user = await Users.findById(userId);

  if (!user) {
    throw new HttpError("User not found", NOT_FOUND);
  }

  if(!oldPassword || !newPassword) {
    throw new HttpError("Old password and new password are required", BAD_REQUEST);
  }

  if(newPassword.length < 6) {
    throw new HttpError("Password must be at least 6 characters", BAD_REQUEST);
  }

  console.log("Comparing passwords:", { enteredPassword: oldPassword, storedPassword: user.password });

  const isMatch = await user.matchPassword(oldPassword);
  if (!isMatch) {
    throw new HttpError("Invalid old password", UNAUTHORIZED);
  }

  user.password = newPassword;
  await user.save();

  return user;
};

export const deleteAddres = async (userId, addressId) => {
  const user = await Users.findById(userId);

  if (!user) {
    throw new HttpError("User not found", UNAUTHORIZED);
  }

  const addressIndex = user.address.findIndex(
    (address) => address._id.toString() == addressId
  );

  if (addressIndex === -1) {
    throw new HttpError("Address not found", NOT_FOUND);
  }

  user.address.splice(addressIndex, 1);
  await user.save();

  return { message: "Address deleted successfully" };
}


