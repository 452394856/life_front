export const getToken = function () {
  let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  return userInfo.token;
};

export const getUserId = function () {
  let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  return userInfo.user_info.id;
};
