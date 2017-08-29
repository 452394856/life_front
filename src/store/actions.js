import {SAVE_USER_INFO} from "./mutation-types";

export default {
  saveUserInfo({commit}, userInfo) {
    commit(SAVE_USER_INFO, userInfo)
  },
}


