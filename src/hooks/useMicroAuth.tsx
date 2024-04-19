import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCaseContext } from "../context";
import { useLocalUser } from "./useLocalUser";

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
  const { createPlayerUseCase, removePlayerUseCase } =
    useContext(useCaseContext);

  const login = async (userName: string) => {
    createPlayerUseCase.execute(userName);
    setUser(userName);
    navigate("/", { replace: true });
  };

  const logout = () => {
    removePlayerUseCase.execute();
    setUser(null);
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
