import styled from "styled-components"
import { Button } from "./Button"
import { Input } from "./Input"
import { Wrapper } from "./Wrapper.styled"
import { useEffect, useState } from "react"

type SettingsScreenPropsType = {
    minValue: number
    maxValue: number
    setValues: (valuesObject:ValuesObjectType) => void
    setInputError: (isError:boolean) => void
    setIsValueSet: (isSetted:boolean) => void
}
export type ValuesObjectType = {
    maxValue: number
    minValue: number
}

export const SettingsScreen = (props: SettingsScreenPropsType) => {
    const [settingsScreenFormState, setSettingsScreenFormState] = useState({
        maxValue: props.maxValue,
        minValue: props.minValue
    })

    const [isInputError, setIsInputError] = useState({
        isMaxValueError: false,
        isMinValueError: false
    })
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)

    const onClickSetHandler = () => {
        props.setValues(settingsScreenFormState)
        props.setIsValueSet(true)
        setIsButtonDisabled(true)
    }

    const maxValueOnChangeHandler = (value: string) => {
        setSettingsScreenFormState({...settingsScreenFormState, maxValue: parseInt(value)})
        props.setIsValueSet(false)
        setIsButtonDisabled(false)
    }
    
    const minValueOnChangeHandler = (value: string) => {
        setSettingsScreenFormState({...settingsScreenFormState, minValue: parseInt(value)})
        props.setIsValueSet(false)
        setIsButtonDisabled(false)
    }

    useEffect(() => { 
        if (settingsScreenFormState.minValue >= settingsScreenFormState.maxValue) {
            setIsInputError({...isInputError, isMaxValueError: true, isMinValueError:true})
            setIsButtonDisabled(true)
            props.setInputError(true)
        } 
        else if (settingsScreenFormState.minValue < 0) {
            setIsInputError({...isInputError, isMaxValueError: false, isMinValueError:true})
            setIsButtonDisabled(true) 
            props.setInputError(true)
        }
        else if (settingsScreenFormState.maxValue < 0) {
            setIsInputError({...isInputError, isMaxValueError: true, isMinValueError:false})
            setIsButtonDisabled(true) 
            props.setInputError(true)
        }
        else {
            setIsInputError({...isInputError, isMaxValueError: false, isMinValueError:false})
            setIsButtonDisabled(false)
            props.setInputError(false)
        }

    }, [settingsScreenFormState.minValue, settingsScreenFormState.maxValue])

    return (
        <Wrapper direction="column" variant="bordered" padding="20px" gap="20px">
            <Form>
                <Input value={settingsScreenFormState.maxValue}
                    label="Max value"
                    onChange={maxValueOnChangeHandler}
                    isError={isInputError.isMaxValueError}
                />
                <Input 
                    value={settingsScreenFormState.minValue} 
                    label="Min value" 
                    onChange={minValueOnChangeHandler}
                    isError={isInputError.isMinValueError}
                />
                <Button name="Set" 
                    onClick={onClickSetHandler} 
                    isDisabled={isButtonDisabled}/>
            </Form>
        </Wrapper>
    )
}

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`