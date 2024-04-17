import { Route, Routes } from "react-router-dom";
import Arcade from "../pages/Arcade";
import MicroAuth from "../pages/MicroAuth";
import TableGame from "../pages/Liga4/TableGame";
import GenericError from "../pages/errors/GenericError";
import PageNotFound from "../pages/errors/PageNotFound";
import { PrivateRoute } from "./PrivateRoute";
import { MicroAuthProvider } from "../hooks/useMicroAuth";
import SetupGame from "../pages/Liga4/SetupGame";

export default function Router() {
  return (
    <MicroAuthProvider>
      <Routes>
        <Route
          path="/login"
          element={<MicroAuth />}
          errorElement={<GenericError />}
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Arcade />
            </PrivateRoute>
          }
          errorElement={<GenericError />}
        />
        <Route
          path="/liga-4/setup"
          element={
            <PrivateRoute>
              <SetupGame />
            </PrivateRoute>
          }
          errorElement={<GenericError />}
        />
        ,
        <Route
          path="/liga-4"
          element={
            <PrivateRoute>
              <TableGame />
            </PrivateRoute>
          }
          errorElement={<GenericError />}
        />
        ,
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </MicroAuthProvider>
  );
}
