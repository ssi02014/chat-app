import React, { useState } from "react";
import Form from "@components/Form";
import InputBox from "@components/Input";
import Button from "@components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebase } from "../firebase.config";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });
  const [errorFromSubmit, setErrorFromSubmit] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const auth = getAuth(firebase);
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = userCredential.user;
      if (user) navigate("/");
    } catch (err: any) {
      const errorMessage = err.message;

      setErrorFromSubmit(errorMessage);
      setTimeout(() => {
        setErrorFromSubmit("");
      }, 5000);
    } finally {
      setLoading(false);
    }
  });

  return (
    <Form direction="column" onSubmit={onSubmit}>
      <h1>로그인</h1>
      <InputBox
        type="email"
        id="email"
        label="Email"
        {...register("email", {
          required: true,
          pattern: /^\S+@\S+$/i,
        })}
      />
      {errors?.email?.type === "required" && (
        <Form.Error>This field is required</Form.Error>
      )}

      <InputBox
        type="password"
        id="password"
        label="Password"
        {...register("password", { required: true, minLength: 6 })}
      />

      {errors?.password?.type === "required" && (
        <Form.Error>This field is required</Form.Error>
      )}
      {errors?.password?.type === "minLength" && (
        <Form.Error>Password must have at least 6 characters</Form.Error>
      )}

      {errorFromSubmit && <Form.Error>{errorFromSubmit}</Form.Error>}

      <Button bgColor="#7A84EB" disabled={loading}>
        제출
      </Button>
      <Link to="/register">아직 아이디가 없다면...</Link>
    </Form>
  );
};

export default LoginPage;
