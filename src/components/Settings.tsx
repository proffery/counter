import styled from "styled-components"
import { Button } from "./Button"
import { Input } from "./Input"
import { Wrapper } from "./Wrapper.styled"
import { useEffect, useState } from "react"
import { GlobalCounterState } from "../AppCounter"

type SettingsPropsType = {
    globalCounterState: GlobalCounterState
    setValues: (valuesObject: MinMaxValuesObjectType) => void
    setInputError: (isError: boolean) => void
    setIsSetButtonDisabled: (isDisabled: boolean) => void
}
export type MinMaxValuesObjectType = {
    maxValue: string
    minValue: string
}

export const Settings = (props: SettingsPropsType) => {
    const [inputsLocalState, setInputsLocalState] = useState<MinMaxValuesObjectType>({
        maxValue: props.globalCounterState.maxValue,
        minValue: props.globalCounterState.minValue
    })
    const [inputLocalError, setInputLocalError] = useState({
        isMaxValueError: false,
        isMinValueError: false
    })

    const localInputsErrorsControlLogic = () => {
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
    }
    // useEffect(() => {
    //     //set props values from LocalStorage
    //     setInputsLocalState({ ...inputsLocalState, maxValue: props.globalCounterState.maxValue, minValue: props.globalCounterState.minValue })
    // }, [props.globalCounterState.maxValue, props.globalCounterState.minValue])

    useEffect(() => {
        localInputsErrorsControlLogic()
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
        <Wrapper
            direction="column"
            variant="bordered"
            minheight="200px"
            padding="20px"
            gap="20px"
        >
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