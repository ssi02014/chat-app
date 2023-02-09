import styled, { css } from "styled-components";

interface StyledButtonProps {
  bgColor: string;
  fontColor: string;
}

export const StyledButton = styled.button<StyledButtonProps>`
  width: 100%;
  padding: 10px;
  border: 1px solid #111;
  outline: none;
  border-radius: 4px;

  ${({ bgColor, fontColor }) => css`
    color: ${fontColor};
    background-color: ${bgColor};
    border: 1px solid ${bgColor};
  `}

  &:hover {
    filter: brightness(95%);
  }
  &:disabled {
    opacity: 0.3;
  }
`;
