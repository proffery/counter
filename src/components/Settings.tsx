import styled from "styled-components"
import { Button } from "./Button"
import { Input } from "./Input"
import { Wrapper } from "./Wrapper.styled"
import { useEffect, useState } from "react"
import { CounterState } from "../AppCounter"

type SettingsPropsType = {
    globalCounterState: CounterState
    setValues: (valuesObject: ValuesObjectType) => void
    setInputError: (isError: boolean) => void
    setIsSetButtonDisabled: (isDisabled: boolean) => void
}
export type ValuesObjectType = {
    maxValue: string
    minValue: string
}

export const Settings = (props: SettingsPropsType) => {
    const [inputsLocalState, setInputsLocalState] = useState<ValuesObjectType>({
        maxValue: props.globalCounterState.maxValue,
        minValue: props.globalCounterState.minValue
    })
    const [inputLocalError, setInputLocalError] = useState({
        isMaxValueError: false,
        isMinValueError: false
    })

    useEffect(() => {
        setInputsLocalState({ ...inputsLocalState, maxValue: props.globalCounterState.maxValue, minValue: props.globalCounterState.minValue })
    }, [props.globalCounterState.maxValue, props.globalCounterState.minValue])

    useEffect(() => {
        if (Number(inputsLocalState.minValue) < 0 && Number(inputsLocalState.maxValue) < 0) {
            setInputLocalError({ ...inputLocalError, isMaxValueError: true, isMinValueError: true })
            props.setIsSetButtonDisabled(true)
            props.setInputError(true)
        }
        else if (Number(inputsLocalState.minValue) < 0) {
            setInputLocalError({ ...inputLocalError, isMaxValueError: false, isMinValueError: true })
            props.setIsSetButtonDisabled(true)
            props.setInputError(true)
        }
        else if (Number(inputsLocalState.maxValue) < 0) {
            setInputLocalError({ ...inputLocalError, isMaxValueError: true, isMinValueError: false })
            props.setIsSetButtonDisabled(true)
            props.setInputError(true)
        }
        else if (Number(inputsLocalState.minValue) >= Number(inputsLocalState.maxValue)) {
            setInputLocalError({ ...inputLocalError, isMaxValueError: true, isMinValueError: true })
            props.setIsSetButtonDisabled(true)
            props.setInputError(true)
        }
        else {
            setInputLocalError({ ...inputLocalError, isMaxValueError: false, isMinValueError: false })
            props.setIsSetButtonDisabled(false)
            props.setInputError(false)
        }
    }, [inputsLocalState.maxValue, inputsLocalState.minValue])

    const onSetClickHandler = () => {
        props.setIsSetButtonDisabled(true)
        props.setValues(inputsLocalState)
    }

    const maxValueOnChangeHandler = (value: string) => {
        setInputsLocalState({ ...inputsLocalState, maxValue: value })
        props.setIsSetButtonDisabled(false)
    }

    const minValueOnChangeHandler = (value: string) => {
        setInputsLocalState({ ...inputsLocalState, minValue: value })
        props.setIsSetButtonDisabled(false)
    }


    return (
        <Wrapper direction="column" variant="bordered" padding="20px" gap="20px">
            <Form>
                <Input
                    value={inputsLocalState.maxValue}
                    label="Max value"
                    onChange={maxValueOnChangeHandler}
                    isInputError={inputLocalError.isMaxValueError}
                />
                <Input
                    value={inputsLocalState.minValue}
                    label="Min value"
                    onChange={minValueOnChangeHandler}
                    isInputError={inputLocalError.isMinValueError}
                />
                <Button name="Set"
                    onClick={onSetClickHandler}
                    isDisabled={props.globalCounterState.setButtonDisabled} />
            </Form>
        </Wrapper>
    )
}

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`