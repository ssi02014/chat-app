import React, { ChangeEvent, ComponentProps } from "react";
import * as S from "./styled";

interface InputBoxProps extends ComponentProps<"input"> {
  label?: string;
}

const InputBox = ({
  type = "text",
  value,
  placeholder,
  label,
  id,
  onChange,
}: InputBoxProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);
  };

  return (
    <S.InputBoxWrapper>
      {label && <S.StyledLabel htmlFor={id}>{label}</S.StyledLabel>}
      <S.StyledInput
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </S.InputBoxWrapper>
  );
};

export default InputBox;
