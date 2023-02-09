import React, { ComponentProps } from "react";
import { MouseEvent } from "react";
import * as S from "./styled";

interface ButtonProps extends ComponentProps<"button"> {
  bgColor?: string;
  fontColor?: string;
}

const Button = ({
  children,
  bgColor = "",
  fontColor = "#fff",
  disabled = false,
  onClick,
}: ButtonProps) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(e);
  };

  return (
    <S.StyledButton
      disabled={disabled}
      bgColor={bgColor}
      fontColor={fontColor}
      onClick={handleClick}
    >
      {children}
    </S.StyledButton>
  );
};

export default Button;
