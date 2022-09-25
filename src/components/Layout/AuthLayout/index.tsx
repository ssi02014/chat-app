import React from "react";
import * as S from "./styled";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <S.Wrapper>
      <Outlet />
    </S.Wrapper>
  );
};

export default AuthLayout;
