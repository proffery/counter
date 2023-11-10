import styled, { css } from "styled-components"

type ScreenPropsType = {
    screenValue: number
    maxValue: number
    inputError: boolean
    isValueSet: boolean
}
export const Screen = (props: ScreenPropsType) => {
    const errorMsg = "Incorect value"
    const infoMsg = "Enter values and press \"set\""
    
    return (
        <StyledScreen 
            maxvalue={props.maxValue} 
            screenvalue={props.screenValue}
            inputerror={props.inputError}
            isvalueset={props.isValueSet}
        >
            {props.isValueSet ? props.screenValue : props.inputError ? errorMsg : infoMsg}
        </StyledScreen>
    )
}

type StyledScreenType = {
    screenvalue?: number
    maxvalue?: number
    inputerror?: boolean
    isvalueset?: boolean
}

const StyledScreen = styled.div<StyledScreenType>`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 20px;
    padding: 10px;
    max-width: 160px;
    border: 1px solid blueviolet;
    border-radius: 10px;
    color: white;
    ${props => (props.screenvalue === props.maxvalue || props.inputerror) && css<StyledScreenType>`
    color: red;
    `}
    ${props => (props.screenvalue !== props.maxvalue && !props.inputerror) && css<StyledScreenType>`
    color: white;
    `}

    ${props => props.isvalueset && css<StyledScreenType>`
        font-size: 60px;
    `}
`