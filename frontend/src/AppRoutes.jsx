import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";

import { LoginPage } from "./pages/Login";
import { HomePage } from "./pages/Home";

import { AuthProvider, AuthContext } from "./contexts/auth";
import { useContext } from "react";
import { DefaultSignInPage } from "./layouts/DefaultSigInPage";

export const AppRoutes = () => {
  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext);

    if (loading) {
      return <div>carregando...</div>;
    }
    if (!authenticated) {
      return <Navigate to="/login" />;
    } else {
      return children;
    }
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<DefaultSignInPage />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route
            path="/"
            element={
              <Private>
                <HomePage />
              </Private>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
