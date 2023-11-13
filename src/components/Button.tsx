import styled, { css } from "styled-components"

type ButtonPropsType = {
    name: string
    type?: "submit" | "reset" | "button"
    isDisabled?: boolean
    onClick: () => void
}

export const Button = (props: ButtonPropsType) => {
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
}

type StyledButtonType = {
    disabled?: boolean
}

const StyledButton = styled.button<StyledButtonType>`
    align-self: center;
    background-color: transparent;
    border: 1px solid blueviolet;
    padding: 10px 20px;
    width: 80px;
    color: white;
    border-radius: 10px;
    ${props => props.disabled === true && css<StyledButtonType>`
        opacity: 0.5;
    `}
`
