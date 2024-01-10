import { InputHTMLAttributes, memo } from "react"
import styled, { css } from "styled-components"

interface InputPropsType extends InputHTMLAttributes<HTMLInputElement>  {
    label?: string
    isInputError: boolean
}

export const Input = memo((props: InputPropsType) => {
    console.log("INPUT RENDERED");

    return (
        <div>
            {props.label &&
                <StyledLabel htmlFor={props.label}>{props.label}</StyledLabel>}
            <StyledInput
                type={props.type || "number"}
                error={props.isInputError}
            />
        </div>

    )
})

type StyledInputType = {
    error?: boolean
}

const StyledInput = styled.input<StyledInputType>`
    text-align: right;
    display: flex;
    align-items: center;
    min-width: 180px;
    width: 100%;
    background-color: blueviolet;
    border: 1px solid blueviolet;
    padding: 10px;
    width: 80px;
    color: white;
    border-radius: 10px;
    ${props => props.error && css<StyledInputType>`
        background-color: lightcoral;
        border-color: red;
    `}
`

const StyledLabel = styled.label`
    display: flex;
    padding: 0 5px;
`