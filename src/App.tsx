import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

// Code Splitting
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const ChatPage = lazy(() => import("./pages/ChatPage"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<ChatPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
