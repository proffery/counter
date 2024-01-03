import { ReactNode, memo } from "react";
import styled, { css } from "styled-components";

type WrapperPropsType = {
  variant: "common" | "bordered"
  direction: "column" | "row"
  gap?: string
  padding?: string
  minheight?: string
  minwidth?: string
  justify?: string
  children: ReactNode
}
export const Wrapper = memo((props: WrapperPropsType) => {
  return (
    <StyledWrapper
      variant={props.variant}
      direction={props.direction}
      gap={props.gap}
      padding={props.padding}
      minheight={props.minheight}
      width={props.minwidth}
      justify={props.justify}
    >{props.children}</StyledWrapper>
  )
})

type StyledWrapperPropsType = {
  variant: "common" | "bordered"
  direction: "column" | "row"
  gap?: string
  padding?: string
  minheight?: string
  width?: string
  justify?: string
}
const StyledWrapper = styled.div<StyledWrapperPropsType>`
  display: flex;
  justify-content: ${props => props.justify || "center"};
  min-height: ${props => props.minheight || "0%"};
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