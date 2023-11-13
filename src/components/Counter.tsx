import { useEffect, useState } from "react"
import { ActionScreen } from "./ActionScreen"
import { SettingsScreen, ValuesObjectType } from "./SettingsScreen"
import { Wrapper } from "./Wrapper.styled"

export type CounterState = {
    minValue: number
    maxValue: number
    screenValue: number
    step: number
}

export const Counter = () => {


    const [counterState, setCounterState] = useState<CounterState>({
        minValue: 0,
        maxValue: 5,
        screenValue: 0,
        step: 1
    })

    const [inputError, setInputError] = useState(false)
    const [isValueSet, setIsValueSet] = useState(false)


    useEffect(() => {
        getFromLocalStorage()
    }, [])

    useEffect(() => {
        setCounterState({ ...counterState, screenValue: counterState.minValue })
    }, [counterState.minValue])


    const increaseScreenValue = () => {
        setCounterState({ ...counterState, screenValue: counterState.screenValue + counterState.step })
    }

    const resetScreenValue = () => {
        setCounterState({ ...counterState, screenValue: counterState.minValue })
    }

    const setValues = (valuesObject: ValuesObjectType) => {
        setCounterState({ ...counterState, ...valuesObject })
        setToLocalStorage(valuesObject)
    }

    const setToLocalStorage = (values: ValuesObjectType) => {
        localStorage.setItem('localCounterState', JSON.stringify(values))
    }

    const getFromLocalStorage = async () => {
        const localStorageValues = localStorage.getItem('localCounterState')
        if (localStorageValues) {
            const localStorageParsedValues = await JSON.parse(localStorageValues)
            setCounterState({ ...counterState, maxValue: localStorageParsedValues.maxValue, minValue: localStorageParsedValues.minValue })
            setIsValueSet(true)
        }
    }


    return (
        <Wrapper direction="row" variant="common" gap="20px">
            <SettingsScreen
                globalCounterState={counterState}
                setValues={setValues}
                setInputError={setInputError}
                setIsValueSet={setIsValueSet}
                resetScreenValue={resetScreenValue}
            />
            <ActionScreen
                globalCounterState={counterState}
                increaseScreenValue={increaseScreenValue}
                resetScreenValue={resetScreenValue}
                inputError={inputError}
                isValueSet={isValueSet}
            />
        </Wrapper>
    )
}