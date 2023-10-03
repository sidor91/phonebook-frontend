export const getUserId = state => state.auth.user.id;
export const getUserName = state => state.auth.user.name;
export const getUserAvatar = state => state.auth.user.avatarURL;
export const getIsLoggedIn = state => state.auth.actions.isLoggedIn;
export const getIsRefreshing = state => state.auth.actions.isRefreshing;
export const getIsLoginFailed = state => state.auth.actions.isLoginFailed;
export const getError = state => state.auth.actions.error;
export const getIsEdited = state => state.auth.actions.isUserEdited;
