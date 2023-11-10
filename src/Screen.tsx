import styled, { css } from "styled-components"

type ScreenPropsType = {
    screenValue: number
    maxVal: number
}
export const Screen = (props: ScreenPropsType) => {
    return (
        <StyledScreen maxval={props.maxVal} screenvalue={props.screenValue}>
            {props.screenValue}
        </StyledScreen>
    )
}

type StyledScreenType = {
    screenvalue?: number
    maxval?: number
}

const StyledScreen = styled.div<StyledScreenType>`
    color: white;
    font-size: 60px;
    ${props => props.screenvalue === props.maxval && css<StyledScreenType>`
        color: red;
    `}
`