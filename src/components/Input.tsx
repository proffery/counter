import { ChangeEvent } from "react"
import styled, { css } from "styled-components"

type InputPropsType = {
    label?: string
    isError?: boolean
    value: number
    onChange: (value: string) => void
}

export const Input = (props:InputPropsType) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.onChange(e.currentTarget.value)
    }

    return (
    <div>
        {props.label && 
            <StyledLabel htmlFor={props.label}>{props.label}</StyledLabel>}
        <StyledInput 
            type="number" 
            id={props.label} 
            value={props.value}
            onChange={onChangeHandler}
            iserror={props.isError || false}
        />
    </div>

    )
}

type StyledInputPropsType = {
    iserror?: boolean
}

const StyledInput = styled.input<StyledInputPropsType>`
    text-align: right;
    display: flex;
    min-width: 160px;
    width: 100%;
    background-color: transparent;
    border: 1px solid blueviolet;
    padding: 10px;
    width: 80px;
    color: white;
    border-radius: 10px;
    ${props => props.iserror && css<StyledInputPropsType>`
        background-color: lightcoral;
        border-color: red;
    `}
`

const StyledLabel = styled.label`
    display: flex;
    padding: 0 5px;
`