import { useEffect, useState } from 'react';
import { Settings, MinMaxValuesObjectType } from './components/Settings';
import { Wrapper } from './components/Wrapper.styled';
import { Display } from './components/Display';
import './App.css';


export type GlobalCounterState = {
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

    const [counterState, setCounterState] = useState<GlobalCounterState>({
        minValue: '0',
        maxValue: '5',
        screenValue: '0',
        step: '1',
        inputError: false,
        setButtonDisabled: true,
        addButtonDisabled: false,
        resetButtonDisabled: true
    })

    const increaseValueControlLogic = () => {
        if (Number(counterState.screenValue) >= Number(counterState.maxValue)) {
            setIsAddButtonDisabled(true);
            setGlobalError(true);
        }
        else {
            setIsAddButtonDisabled(false);
            setGlobalError(false);
        }
    }

    const resetButtonControlLogic = () => {
        if (Number(counterState.screenValue) === Number(counterState.minValue)) {
            setIsResetButtonDisabled(true);
        }
        else {
            setIsResetButtonDisabled(false);
        }
    }

    useEffect(() => {
        getFromLocalStorage()
    }, [])

    useEffect(() => {
        increaseValueControlLogic();
    }, [counterState.screenValue, counterState.maxValue])

    useEffect(() => {
        resetButtonControlLogic();
    }, [counterState.screenValue, counterState.minValue])

    const setMinMaxValues = (valuesObject: MinMaxValuesObjectType) => {
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
        setGlobalError(false)
        setCounterState(prev => ({ ...prev, screenValue: counterState.minValue }))
    }




    const setGlobalError = (isError: boolean) => {
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

    const saveToLocalStorage = (values: MinMaxValuesObjectType) => {
        localStorage.setItem('localCounterState', JSON.stringify(values))
    }

    const getFromLocalStorage = () => {
        let localStorageValues = localStorage.getItem('localCounterState')
        if (localStorageValues !== null && localStorageValues !== undefined) {
            const localStorageParsedValues = JSON.parse(localStorageValues)
            console.log(localStorageParsedValues)
            setMinMaxValues({
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
        <Wrapper direction="row" variant="common" gap="20px" minHeight="150px" className='App'>
            <Settings
                globalCounterState={counterState}
                setValues={setMinMaxValues}
                setInputError={setGlobalError}
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