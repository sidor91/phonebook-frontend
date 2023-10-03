import { useSelector } from 'react-redux';
import {
  getIsLoggedIn,
  getUserName,
  getUserId,
  getUserAvatar,
  getIsRefreshing,
  getIsLoginFailed,
  getError,
  getIsEdited,
} from '@/redux/auth/selectors';

export const useAuth = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const isRefreshing = useSelector(getIsRefreshing);
  const userAvatar = useSelector(getUserAvatar);
  const userName = useSelector(getUserName);
  const isLoginFailed = useSelector(getIsLoginFailed);
  const authErrorMessage = useSelector(getError);
  const isUserEdited = useSelector(getIsEdited);
  const userId = useSelector(getUserId);

  return {
    isLoggedIn,
    userAvatar,
    userName,
    isRefreshing,
    isLoginFailed,
    authErrorMessage,
    isUserEdited,
    userId,
  };
};
