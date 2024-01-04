import { ChangeEvent, memo } from "react"
import styled, { css } from "styled-components"

type InputPropsType = {
    label?: string
    type?: 'number' | 'text' | 'password'
    isInputError: boolean
    value: string
    onChange: (value: string) => void
}

export const Input = memo((props: InputPropsType) => {
    console.log("INPUT RENDERED");
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.onChange(e.currentTarget.value)
    }

    return (
        <div>
            {props.label &&
                <StyledLabel htmlFor={props.label}>{props.label}</StyledLabel>}
            <StyledInput
                type={props.type || "number"}
                id={props.label}
                value={props.value}
                onChange={onChangeHandler}
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