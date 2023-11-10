import styled from "styled-components"

type InputPropsType = {
    placeholder?: string
    value: number
}

export const Input = (props:InputPropsType) => {
    return (
        <StyledInput type="number" value={props.value} placeholder={props.placeholder || ''}></StyledInput>
    )
}

const StyledInput = styled.input`
    display: flex;
    min-width: 160px;
    width: 100%;
    background-color: transparent;
    border: 1px solid blueviolet;
    padding: 10px;
    width: 80px;
    color: white;
    border-radius: 10px;
`