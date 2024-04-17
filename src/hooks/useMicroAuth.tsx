import { createContext, useContext, useMemo } from "react";
import { useLocalUser } from "./useLocalUser";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";

interface Props {
  children: React.ReactNode;
}

interface PropsContext {
  user: string;
  login: (name: string) => void;
  logout: () => void;
}

const AuthContext = createContext<PropsContext>({
  user: "",
  login: () => {},
  logout: () => {},
});

export const MicroAuthProvider = ({ children }: Props) => {
  const [user, setUser] = useLocalUser();
  const navigate = useNavigate();

  const login = async (userName: string) => {
    setUser(userName);
    navigate("/", { replace: true });
  };

  const logout = () => {
    setUser(null);
    socket.disconnect();
    socket.connect();
    navigate("/login", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useMicroAuth = () => {
  return useContext(AuthContext);
};
