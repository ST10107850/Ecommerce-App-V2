export const clearAuthCookies = (res) => {
  res.clearCookie("jwt");
  res.clearCookie("refreshToken");
};
