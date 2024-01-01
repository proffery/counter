import styled, { css } from "styled-components";

type WrapperPropsType = {
  variant: "common" | "bordered"
  direction: "column" | "row"
  gap?: string
  padding?: string
  minheight?: string
  justify?: string
}

export const Wrapper = styled.div<WrapperPropsType>`
  display: flex;
  justify-content: ${props => props.justify || "center"};
  min-height: ${props => props.minheight || "0%"};
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