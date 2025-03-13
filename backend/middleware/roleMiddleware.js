import { FORBIDDEN, UNAUTHORIZED } from "../constants/http.codes.js";
import HttpError from "../utils/HttpError.js";

export const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      console.log(req.user._id)
      throw new HttpError("Unauthorized: No user logged in", UNAUTHORIZED);
    }

    const { role } = req.user;
    if (!allowedRoles.includes(role)) {
      throw new HttpError(
        "Access Denied: Insufficient permission",
        FORBIDDEN
      );
    }
    next();
  };
};
