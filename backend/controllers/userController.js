import expressAsyncHandler from "express-async-handler";
import Users from "../models/userModel.js";
import mongoose from "mongoose";
import {
  deleteAddres,
  getProfile,
  loginUser,
  registerUser,
  updatePassword,
  updateProfiles,
} from "../services/userService.js";
import { CREATED, OK } from "../constants/http.codes.js";
import { clearAuthCookies } from "../utils/userCookies.js";

export const createUser = expressAsyncHandler(async (req, res) => {
  const user = await registerUser(req.body);
  const data = new Users(user).omitFields(["password", "refreshToken"]);
  res
    .status(CREATED)
    .json({ success: true, status: "User succefully registered", data: data });
});

export const authUser = expressAsyncHandler(async (req, res) => {
  const { user } = await loginUser(req.body, res);

  const data = new Users(user).omitFields(["password", "refreshToken"]);

  res.status(OK).json({
    success: true,
    status: "User succefully logged in",
    data: data,
  });
});

export const logout = expressAsyncHandler(async (req, res) => {
  clearAuthCookies(res);
  res.status(OK).json({ message: "Logout successfully....." });
});

export const getuserProfile = expressAsyncHandler(async (req, res) => {
  const user = await getProfile(req.user._id);

  const data = new Users(user).omitFields(["password", "refreshToken"]);

  res.status(OK).json({ success: true, data: data });
});

export const updateProfile = expressAsyncHandler(async (req, res) => {
  const user = await updateProfiles(req.user._id, req);

  const data = new Users(user).omitFields(["password", "refreshToken"]);

  res.status(OK).json({
    success: true,
    status: "Profile updated successfully",
    data: data,
  });
});

export const getCustomerUser = expressAsyncHandler(async (req, res) => {
  const users = await Users.find({ role: "customer" });

  res.status(OK).json({ success: true, data: users });
});

export const updateUserPassword = expressAsyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  await updatePassword(req.user._id, oldPassword, newPassword);

  res
    .status(OK)
    .json({ success: true, status: "Password updated successfully" });
});

export const deleteAddress = expressAsyncHandler(async (req, res) => {
  const { addressId } = req.params;

  const addresses = await deleteAddres(req.user._id, addressId);

  res.status(OK).json(addresses);
});
