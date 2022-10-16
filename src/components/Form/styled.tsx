import styled from "styled-components";

interface FormWrapperProps {
  direction: string;
}
export const FormWrapper = styled.form<FormWrapperProps>`
  width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${({ direction }) => direction};

  h1 + div {
    margin-top: 20px;
  }

  div + div {
    margin-top: 20px;
  }

  div + button {
    margin-top: 30px;
  }

  & > a {
    align-self: flex-start;
    color: #a1a1a1;
    cursor: pointer;
  }
`;

export const FormErrorContent = styled.p`
  width: 100%;
  justify-self: flex-start;
  color: red;
`;
