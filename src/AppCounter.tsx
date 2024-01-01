import { useEffect, useState } from 'react';
import { Settings, ValuesObjectType } from './components/Settings';
import { Wrapper } from './components/Wrapper.styled';
import { Display } from './components/Display';
import './App.css';


export type CounterState = {
    minValue: string
    maxValue: string
    screenValue: string
    step: string
    inputError: boolean
    setButtonDisabled: boolean
    addButtonDisabled: boolean
    resetButtonDisabled: boolean
}


export function AppCounter() {

    const [counterState, setCounterState] = useState<CounterState>({
        minValue: '0',
        maxValue: '5',
        screenValue: '0',
        step: '1',
        inputError: false,
        setButtonDisabled: true,
        addButtonDisabled: false,
        resetButtonDisabled: true
    })

    useEffect(() => {
        getFromLocalStorage()
    }, [])

    useEffect(() => {
        if (Number(counterState.screenValue) >= Number(counterState.maxValue)) {
            setIsAddButtonDisabled(true)
            setInputError(true)
        }
        else {
            setIsAddButtonDisabled(false)
            setInputError(false)

        }
    }, [counterState.screenValue, counterState.maxValue])

    useEffect(() => {
        if (Number(counterState.screenValue) === Number(counterState.minValue)) {
            setIsResetButtonDisabled(true)
        }
        else {
            setIsResetButtonDisabled(false)
        }
    }, [counterState.screenValue, counterState.minValue])

    const setValues = (valuesObject: ValuesObjectType) => {
        setCounterState(prev => ({
            ...prev,
            maxValue: valuesObject.maxValue, 
            minValue: valuesObject.minValue, 
            screenValue: valuesObject.minValue
        }))
        saveToLocalStorage(valuesObject)
    }

    const increaseScreenValue = () => {
        setCounterState(prev => ({ ...prev, screenValue: (Number(counterState.screenValue) + Number(counterState.step)).toString() }))
    }

    const resetScreenValue = () => {
        setInputError(false)
        setCounterState(prev => ({ ...prev, screenValue: counterState.minValue }))
    }




    const setInputError = (isError: boolean) => {
        setCounterState(prev => ({ ...prev, inputError: isError }))
    }

    const setIsSetButtonDisabled = (isDisabled: boolean) => {
        setCounterState(prev => ({ ...prev, setButtonDisabled: isDisabled }))
    }

    const setIsAddButtonDisabled = (isDisabled: boolean) => {
        setCounterState(prev => ({ ...prev, addButtonDisabled: isDisabled }))
    }

    const setIsResetButtonDisabled = (isDisabled: boolean) => {
        setCounterState(prev => ({ ...prev, resetButtonDisabled: isDisabled }))
    }

    const saveToLocalStorage = (values: ValuesObjectType) => {
        localStorage.setItem('localCounterState', JSON.stringify(values))
    }

    const getFromLocalStorage = () => {
        let localStorageValues = localStorage.getItem('localCounterState')
        if (localStorageValues !== null && localStorageValues !== undefined) {
            const localStorageParsedValues = JSON.parse(localStorageValues)
            console.log(localStorageParsedValues)
            setValues({
                maxValue: localStorageParsedValues.maxValue,
                minValue: localStorageParsedValues.minValue
            })
            setIsSetButtonDisabled(true)
        }
        else {
            saveToLocalStorage({ maxValue: counterState.maxValue, minValue: counterState.minValue })
        }

    }


    return (
        <Wrapper direction="row" variant="common" gap="20px" className='App'>
            <Settings
                globalCounterState={counterState}
                setValues={setValues}
                setInputError={setInputError}
                setIsSetButtonDisabled={setIsSetButtonDisabled}
            />
            <Display
                globalCounterState={counterState}
                increaseScreenValue={increaseScreenValue}
                resetScreenValue={resetScreenValue}
                setIsAddButtonDisabled={setIsAddButtonDisabled}
            />
        </Wrapper>
    )
}