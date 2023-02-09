import React, { useRef, useState } from "react";
import Form from "@components/Form";
import InputBox from "@components/Input";
import Button from "@components/Button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const RegisterPage = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });
  const [errorFromSubmit, setErrorFromSubmit] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordRef = useRef();
  passwordRef.current = watch("password");

  const onSubmit = handleSubmit(async (data) => {
    const auth = getAuth();
    setLoading(true);

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log(res);
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
      <h1>회원가입</h1>
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
        id="name"
        label="Name"
        {...register("name", { required: true, maxLength: 10 })}
      />

      {errors?.name?.type === "required" && (
        <Form.Error>This field is required</Form.Error>
      )}
      {errors?.name?.type === "maxLength" && (
        <Form.Error>Your input exceed maximum length</Form.Error>
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

      <InputBox
        type="password"
        id="password-confirm"
        label="Password Confirm"
        {...register("password-confirm", {
          required: true,
          validate: (value) => {
            return value === passwordRef.current;
          },
        })}
      />

      {errors["password-confirm"]?.type === "required" && (
        <Form.Error>This field is required</Form.Error>
      )}
      {errors["password-confirm"]?.type === "validate" && (
        <Form.Error>The passwords do not match</Form.Error>
      )}
      {errorFromSubmit && <Form.Error>{errorFromSubmit}</Form.Error>}

      <Button bgColor="#7A84EB" disabled={loading}>
        제출
      </Button>
      <Link to="/login">이미 아이디가 없다면...</Link>
    </Form>
  );
};

export default RegisterPage;
