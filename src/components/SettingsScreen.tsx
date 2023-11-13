import styled from "styled-components"
import { Button } from "./Button"
import { Input } from "./Input"
import { Wrapper } from "./Wrapper.styled"
import { useEffect, useState } from "react"
import { CounterState } from "./Counter"

type SettingsScreenPropsType = {
    globalCounterState: CounterState
    setValues: (valuesObject: ValuesObjectType) => void
    setInputError: (isError: boolean) => void
    setIsValueSet: (isSetted: boolean) => void
    resetScreenValue: () => void
}
export type ValuesObjectType = {
    maxValue: number
    minValue: number
}

export const SettingsScreen = (props: SettingsScreenPropsType) => {
    const [inputsLocalState, setInputsLocalState] = useState({
        maxValue: props.globalCounterState.maxValue,
        minValue: props.globalCounterState.minValue
    })

    const [isInputError, setIsInputError] = useState({
        isMaxValueError: false,
        isMinValueError: false
    })
    const [isSetButtonDisabled, setIsSetButtonDisabled] = useState(false)

    useEffect(() => {
        setInputsLocalState({ ...inputsLocalState, maxValue: props.globalCounterState.maxValue, minValue: props.globalCounterState.minValue })
    }, [props.globalCounterState.maxValue, props.globalCounterState.minValue])

    const onClickSetHandler = () => {
        props.setValues(inputsLocalState)
        props.setIsValueSet(true)
        setIsSetButtonDisabled(true)
    }

    const maxValueOnChangeHandler = (value: string) => {
        setInputsLocalState({ ...inputsLocalState, maxValue: parseInt(value) })
        props.setIsValueSet(false)
        props.resetScreenValue()
        setIsSetButtonDisabled(false)
    }

    const minValueOnChangeHandler = (value: string) => {
        setInputsLocalState({ ...inputsLocalState, minValue: parseInt(value) })
        props.setIsValueSet(false)
        props.resetScreenValue()
        setIsSetButtonDisabled(false)
    }

    useEffect(() => {
        if (inputsLocalState.minValue >= inputsLocalState.maxValue) {
            setIsInputError({ ...isInputError, isMaxValueError: true, isMinValueError: true })
            setIsSetButtonDisabled(true)
            props.setInputError(true)
        }
        else if (inputsLocalState.minValue < 0) {
            setIsInputError({ ...isInputError, isMaxValueError: false, isMinValueError: true })
            setIsSetButtonDisabled(true)
            props.setInputError(true)
        }
        else if (inputsLocalState.maxValue < 0) {
            setIsInputError({ ...isInputError, isMaxValueError: true, isMinValueError: false })
            setIsSetButtonDisabled(true)
            props.setInputError(true)
        }
        else {
            setIsInputError({ ...isInputError, isMaxValueError: false, isMinValueError: false })
            setIsSetButtonDisabled(false)
            props.setInputError(false)
        }

    }, [inputsLocalState.minValue, inputsLocalState.maxValue])

    return (
        <Wrapper direction="column" variant="bordered" padding="20px" gap="20px">
            <Form>
                <Input value={inputsLocalState.maxValue}
                    label="Max value"
                    onChange={maxValueOnChangeHandler}
                    isInputError={isInputError.isMaxValueError}
                />
                <Input
                    value={inputsLocalState.minValue}
                    label="Min value"
                    onChange={minValueOnChangeHandler}
                    isInputError={isInputError.isMinValueError}
                />
                <Button name="Set"
                    onClick={onClickSetHandler}
                    isDisabled={isSetButtonDisabled} />
            </Form>
        </Wrapper>
    )
}

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`