import styled, { css } from "styled-components";

type WrapperPropsType = {
    variant: "common" | "bordered"
    direction: "column" | "row"
    gap?: string
    padding?: string
}

export const Wrapper = styled.div<WrapperPropsType>`
  display: flex;
  flex-direction: ${props => props.direction};
  padding: ${props => props.padding || "0px"};
  border-radius: 10px;
  gap: ${props => props.gap || "0px"};
  ${props => props.variant === "common" && css`
    border: none;
  `}
  
  ${props => props.variant === "bordered" && css`
    border: 1px solid blueviolet;
  `}
`