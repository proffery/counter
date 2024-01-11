import styled from "styled-components"
import { Button } from "./Button"
import { Input } from "./Input"
import { ChangeEvent, memo, useCallback } from "react"
import { Wrapper } from "./Wrapper"

type SettingsPropsType = {
    maxValue: string
    minValue: string
    isMaxValueError: boolean
    isMinValueError: boolean
    setButtonDisabled: boolean
    onSetClickHandler: () => void
    maxValueLocalOnChange: (value: string) => void
    minValueLocalOnChange: (value: string) => void
}

export const Settings = memo((props: SettingsPropsType) => {
    console.log("SETTINGS RENDERED");

    const maxValueOnChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.maxValueLocalOnChange(e.currentTarget.value)
    }, [props.maxValue, props.isMaxValueError])

    const minValueOnChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.minValueLocalOnChange(e.currentTarget.value)
    }, [props.minValue, props.isMinValueError])

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
                    value={props.maxValue}
                    label="Max value"
                    onChange={maxValueOnChangeHandler}
                    isInputError={props.isMaxValueError}
                />
                <Input
                    value={props.minValue}
                    label="Min value"
                    onChange={minValueOnChangeHandler}
                    isInputError={props.isMinValueError}
                />
                <Button name="Set"
                    onClick={props.onSetClickHandler}
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