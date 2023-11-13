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
    resetScreenValue: () => void
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
    const [isSetButtonDisabled, setIsSetButtonDisabled] = useState(false)

    const onClickSetHandler = () => {
        props.setValues(settingsScreenFormState)
        props.setIsValueSet(true)
        setIsSetButtonDisabled(true)
    }

    const maxValueOnChangeHandler = (value: string) => {
        setSettingsScreenFormState({...settingsScreenFormState, maxValue: parseInt(value)})
        props.setIsValueSet(false)
        props.resetScreenValue()
        setIsSetButtonDisabled(false)
    }
    
    const minValueOnChangeHandler = (value: string) => {
        setSettingsScreenFormState({...settingsScreenFormState, minValue: parseInt(value)})
        props.setIsValueSet(false)
        props.resetScreenValue()
        setIsSetButtonDisabled(false)
    }

    useEffect(() => { 
        if (settingsScreenFormState.minValue >= settingsScreenFormState.maxValue) {
            setIsInputError({...isInputError, isMaxValueError: true, isMinValueError:true})
            setIsSetButtonDisabled(true)
            props.setInputError(true)
        } 
        else if (settingsScreenFormState.minValue < 0) {
            setIsInputError({...isInputError, isMaxValueError: false, isMinValueError:true})
            setIsSetButtonDisabled(true) 
            props.setInputError(true)
        }
        else if (settingsScreenFormState.maxValue < 0) {
            setIsInputError({...isInputError, isMaxValueError: true, isMinValueError:false})
            setIsSetButtonDisabled(true) 
            props.setInputError(true)
        }
        else {
            setIsInputError({...isInputError, isMaxValueError: false, isMinValueError:false})
            setIsSetButtonDisabled(false)
            props.setInputError(false)
        }

    }, [settingsScreenFormState.minValue, settingsScreenFormState.maxValue])

    return (
        <Wrapper direction="column" variant="bordered" padding="20px" gap="20px">
            <Form>
                <Input value={settingsScreenFormState.maxValue}
                    label="Max value"
                    onChange={maxValueOnChangeHandler}
                    isInputError={isInputError.isMaxValueError}
                />
                <Input 
                    value={settingsScreenFormState.minValue} 
                    label="Min value" 
                    onChange={minValueOnChangeHandler}
                    isInputError={isInputError.isMinValueError}
                />
                <Button name="Set" 
                    onClick={onClickSetHandler} 
                    isDisabled={isSetButtonDisabled}/>
            </Form>
        </Wrapper>
    )
}

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`