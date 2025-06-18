import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPage from "./pages/ForgotPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="auth">
          <Route path="login" element={<LoginPage/>}></Route>
          <Route path="register" element={<RegisterPage/>}></Route>
          <Route path="forgot" element={<ForgotPage/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
