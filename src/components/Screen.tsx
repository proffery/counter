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
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: white;
    font-size: 60px;
    border: 1px solid blueviolet;
    border-radius: 10px;
    ${props => props.screenvalue === props.maxval && css<StyledScreenType>`
        color: red;
    `}
`