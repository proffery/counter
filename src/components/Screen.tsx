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
    justify-content: center;
    height: 100%;
    min-height: 110px;
    font-size: 28px;
    padding: 10px;
    max-width: 160px;
    border: 1px solid blueviolet;
    border-radius: 10px;
    color: white;
    ${props => props.error && css<StyledScreenType>`
        color: red;
    `}
`