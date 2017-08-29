export const getToken = function () {
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return userInfo.token;
};
