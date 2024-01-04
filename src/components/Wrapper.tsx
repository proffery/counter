import { ReactNode, memo } from "react";
import styled, { css } from "styled-components";

type WrapperPropsType = {
  variant: "common" | "bordered"
  direction: "column" | "row"
  gap?: string
  padding?: string
  height?: string
  justify?: string
  children: ReactNode
  width?: string
  align?: string
}
export const Wrapper = memo((props: WrapperPropsType) => {
  return (
    <StyledWrapper
      variant={props.variant}
      direction={props.direction}
      gap={props.gap}
      padding={props.padding}
      height={props.height}
      width={props.width}
      justify={props.justify}
    >{props.children}</StyledWrapper>
  )
})

const StyledWrapper = styled.div<WrapperPropsType>`
  display: flex;
  align-items: ${props => props.align || "center"};;
  justify-content: ${props => props.justify || "center"};
  height: ${props => props.height || "0%"};
  width: ${props => props.width || "100%"};;
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