import { Navigate } from "react-router-dom";
import { useMicroAuth } from "../hooks/useMicroAuth";

interface Props {
  children: React.ReactNode;
}

export const PrivateRoute = ({ children }: Props) => {
  const { user } = useMicroAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};
