import { useEffect, useState } from "react"
import { ActionScreen } from "./ActionScreen"
import { SettingsScreen, ValuesObjectType } from "./SettingsScreen"
import { Wrapper } from "./Wrapper.styled"


export const CounterOne = () => {

    const [counterState, setCounterState] = useState({
        minValue: 0,
        maxValue: 5,
        screenValue: 0,
        step: 1
    })
    
    const [inputError, setInputError] = useState(false)
    const [isValueSet, setIsValueSet] = useState(false)
    useEffect(() => {
        setCounterState({...counterState, screenValue: counterState.minValue})
    },[counterState.minValue])

    const increaseScreenValue = () => {
        setCounterState({...counterState, screenValue: counterState.screenValue + counterState.step})
    }
    
    const resetScreenValue = () => {
        setCounterState({...counterState, screenValue: counterState.minValue})
    }

    const setValues = (valuesObject: ValuesObjectType) => {
        setCounterState({...counterState, ...valuesObject})
    }

    return (
    <Wrapper direction="row" variant="common" gap="20px">
        <SettingsScreen
            maxValue={counterState.maxValue} 
            minValue={counterState.minValue} 
            setValues={setValues}
            setInputError={setInputError}
            setIsValueSet={setIsValueSet}
            resetScreenValue={resetScreenValue}
        />
        <ActionScreen 
            maxValue={counterState.maxValue} 
            minValue={counterState.minValue} 
            screenValue={counterState.screenValue}
            increaseScreenValue={increaseScreenValue}
            resetScreenValue={resetScreenValue}
            inputError={inputError}
            isValueSet={isValueSet}
        />
    </Wrapper>
    )
}