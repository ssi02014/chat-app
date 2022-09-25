import React, { lazy, Suspense } from "react";
import AuthLayout from "@components/Layout/AuthLayout";
import GlobalStyle from "@styles/globalStyles";
import { Route, Routes } from "react-router-dom";

// Code Splitting
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const ChatPage = lazy(() => import("./pages/ChatPage"));

function App() {
  return (
    <>
      <GlobalStyle />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Chat */}
          <Route path="/" element={<ChatPage />} />

          {/* Auth */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* Not Found */}
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
