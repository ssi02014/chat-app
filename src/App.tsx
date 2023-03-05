import React, { lazy, Suspense, useEffect } from "react";
import AuthLayout from "@components/Layout/AuthLayout";
import GlobalStyle from "@styles/globalStyles";
import { Route, Routes } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebase } from "./firebase.config";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@redux/slices/user";
import { RootState } from "@redux/store";

// Code Splitting
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const ChatPage = lazy(() => import("./pages/ChatPage"));

function App() {
  const { isLoading } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth(firebase);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
        dispatch(setUser(user));
      } else {
        navigate("/login");
      }
    });
  }, []);

  if (isLoading) return <></>;
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
