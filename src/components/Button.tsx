import { memo } from "react"
import styled, { css } from "styled-components"

export type ButtonPropsType = {
    name: string
    type?: "submit" | "reset" | "button"
    isDisabled?: boolean
    onClick: () => void
}

export const Button = memo((props: ButtonPropsType) => {
    console.log("BUTTON " + props.name + " RENDERED");
    const onClickHandler = () => {
        props.onClick()
    }
    return (
        <StyledButton
            disabled={props.isDisabled}
            onClick={onClickHandler}
            type={props.type || "button"}
        >{props.name}</StyledButton>
    )
})

type StyledButtonType = {
    disabled?: boolean
}

export const StyledButton = styled.button<StyledButtonType>`
    align-self: center;
    text-align: center;
    background-color: blueviolet;
    border: 1px solid blueviolet;
    padding: 10px 15px;
    color: white;
    min-width: 70px;
    border-radius: 10px;
    transition: all .1s ease-in-out;
    ${props => props.disabled === true && css<StyledButtonType>`
        opacity: 0.5;
        transform: none
    `}
    &:active {
        transform: scale(1.1)
    }
`
