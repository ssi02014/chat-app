import React, { ComponentProps, FormEvent } from "react";
import * as S from "./styled";

interface FormProps extends ComponentProps<"form"> {
  direction?: string;
}

interface FormErrorProps {
  children: React.ReactNode;
}

const Form = ({
  children,
  direction = "row",
  onSubmit,
  onReset,
}: FormProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (onSubmit) onSubmit(e);
  };

  const handleReset = (e: FormEvent<HTMLFormElement>) => {
    if (onReset) onReset(e);
  };

  return (
    <S.FormWrapper
      direction={direction}
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      {children}
    </S.FormWrapper>
  );
};

Form.Error = ({ children }: FormErrorProps) => {
  return <S.FormErrorContent>{children}</S.FormErrorContent>;
};

export default Form;
