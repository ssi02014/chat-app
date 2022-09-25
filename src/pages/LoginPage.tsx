import React, { FormEvent } from "react";
import Button from "@components/Button";
import Form from "@components/Form";
import InputBox from "@components/Input";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <Form direction="column" onSubmit={onSubmit}>
      <h1>로그인</h1>
      <InputBox type="email" name="email" id="email" label="Email" />
      <InputBox
        type="password"
        name="password"
        id="password"
        label="Password"
      />
      <Button bgColor="#7A84EB">제출</Button>
      <Link to="/register">이미 아이디가 있다면...</Link>
    </Form>
  );
};

export default LoginPage;
