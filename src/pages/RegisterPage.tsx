import React, { FormEvent } from "react";
import Form from "@components/Form";
import InputBox from "@components/Input";
import Button from "@components/Button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const RegisterPage = () => {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Form direction="column" onSubmit={onSubmit}>
      <h1>회원가입</h1>
      <InputBox type="email" name="email" id="email" label="Email" />
      <InputBox name="name" id="name" label="Name" />
      <InputBox
        type="password"
        name="password"
        id="password"
        label="Password"
      />
      <InputBox
        type="password"
        name="password-confirm"
        id="password-confirm"
        label="Password Confirm"
      />
      <Button bgColor="#7A84EB">제출</Button>
      <Link to="/login">이미 아이디가 없다면...</Link>
    </Form>
  );
};

export default RegisterPage;
