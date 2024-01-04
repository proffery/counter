import { memo } from "react"
import styled, { css } from "styled-components"

type ScreenPropsType = {
    displayValue: string
    isInputError: boolean
}
export const Screen = memo((props: ScreenPropsType) => {
    console.log("SCREEN RENDERED");
    
    return (
        <StyledScreen
            error={props.isInputError}
        >
            {props.displayValue}
        </StyledScreen>
    )
})

type StyledScreenType = {
    error?: boolean
}

const StyledScreen = styled.div<StyledScreenType>`
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    height: 70%;
    font-size: 28px;
    padding: 10px;
    width: 90%;
    background-color: blueviolet;
    border: 1px solid blueviolet;
    border-radius: 10px;
    color: white;
    ${props => props.error && css<StyledScreenType>`
        color: red;
    `}
`