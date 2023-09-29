import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";

import { LoginPage } from "./pages/Login/Index";
import { HomePage } from "./pages/Home/Index";

import { AuthProvider, AuthContext } from "./contexts/auth";
import { useContext } from "react";
import { DefaultSignInPage } from "./layouts/DefaultSigInPage";
import { CreateAccount } from "./pages/Login/CreateAccount";
import { DefaultHomePage } from "./layouts/DefaultHomePage";

export const AppRoutes = () => {
  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext);

    if (loading) {
      return <div>carregando...</div>;
    }

    if (!authenticated) {
      return <Navigate to="/d/login" />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/d" element={<DefaultSignInPage />}>
            <Route path="/d/login" element={<LoginPage />} />
            <Route path="/d/register" element={<CreateAccount />} />
          </Route>
          <Route path="/" element={<DefaultHomePage />}>
            <Route
              path="/"
              element={
                <Private>
                  <HomePage />
                </Private>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
