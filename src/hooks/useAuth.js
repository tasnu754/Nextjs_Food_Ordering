import { useSelector } from "react-redux";

export const useAuth = () => {
  const { user, accessToken } = useSelector((state) => state.auth);

  return {
    isAuthenticated: !!(user && accessToken),
    user,
    accessToken,
  };
};
