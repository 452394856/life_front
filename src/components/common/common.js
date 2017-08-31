export const getToken = function () {
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return userInfo.token;
};

export const getUserId = function () {
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return userInfo.user_info.id;
};
