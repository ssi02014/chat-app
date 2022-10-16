import React, { ChangeEvent, ComponentProps, ForwardedRef } from "react";
import * as S from "./styled";

interface InputBoxProps extends Omit<ComponentProps<"input">, "ref"> {
  label?: string;
}

const InputBox = React.forwardRef(
  (
    {
      type = "text",
      value,
      placeholder,
      label,
      id,
      onChange,
      ...rest
    }: InputBoxProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (onChange) onChange(e);
    };

    return (
      <S.InputBoxWrapper>
        {label && <S.StyledLabel htmlFor={id}>{label}</S.StyledLabel>}
        <S.StyledInput
          ref={ref}
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          {...rest}
        />
      </S.InputBoxWrapper>
    );
  }
);

export default InputBox;
