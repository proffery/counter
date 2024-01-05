import styled from "styled-components"
import { Button } from "./Button"
import { Input } from "./Input"
import { memo, useCallback, useEffect, useState } from "react"
import { Wrapper } from "./Wrapper"

type SettingsPropsType = {
    maxValue: string
    minValue: string
    setButtonDisabled: boolean
    setValues: (valuesObject: MinMaxValuesObjectType) => void
    setInputError: (isError: boolean) => void
    setIsSetButtonDisabled: (isDisabled: boolean) => void
}
export type MinMaxValuesObjectType = {
    maxValue: string
    minValue: string
}

export const Settings = memo((props: SettingsPropsType) => {
    console.log("SETTINGS RENDERED");
    const [inputsLocalState, setInputsLocalState] = useState<MinMaxValuesObjectType>({
        maxValue: props.maxValue,
        minValue: props.minValue
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

    const maxValueOnChangeHandler = useCallback((value: string) => {
        setInputsLocalState({ ...inputsLocalState, maxValue: value })
        props.setIsSetButtonDisabled(false)
    }, [inputsLocalState.maxValue, props.setIsSetButtonDisabled])

    const minValueOnChangeHandler = useCallback((value: string) => {
        setInputsLocalState({ ...inputsLocalState, minValue: value })
        props.setIsSetButtonDisabled(false)
    }, [inputsLocalState.minValue, props.setIsSetButtonDisabled, props.setButtonDisabled])


    return (
        <Wrapper
            direction={"column"}
            variant={"bordered"}
            height={"250px"}
            width={"250px"}
            padding={"20px"}
            gap={"20px"}
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
                    isDisabled={props.setButtonDisabled} />
            </Form>
        </Wrapper>
    )
})

const Form = styled.form`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    gap: 20px;
`