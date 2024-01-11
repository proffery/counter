import { memo, useCallback, useEffect, useState } from 'react';
import { Settings } from './components/Settings';
import { Display } from './components/Display';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
    GlobalCounterState,
    ResetScreenValueAC,
    increaseScreenValueAC,
    setMinMaxValuesAC
} from './state/counterReducer';
import { AppRootStateType } from './state/store';
import { Wrapper } from './components/Wrapper';

export const ERROR_MSG = "Incorect input value"
export const HELP_MSG = "Set values and press \"set\" button"

export const AppWithReduxCounter = memo(() => {
    console.log("APP RENDERED");
    
    type LocalCounterState = {
        maxValue: string
        minValue: string
        isMaxValueError: boolean
        isMinValueError: boolean
        inputError: boolean
        isValuesSeted: boolean
        setButtonDisabled: boolean
        addButtonDisabled: boolean
        resetButtonDisabled: boolean
        currentDisplayValue: string
    }
    const counterState = useSelector<AppRootStateType, GlobalCounterState>(store => store.counter)
    const dispatch = useDispatch()
    const [localCounterState, setLocalCounterState] = useState<LocalCounterState>(
        {
            maxValue: counterState.maxValue,
            minValue: counterState.minValue,
            isMaxValueError: false,
            isMinValueError: false,
            inputError: false,
            isValuesSeted: false,
            setButtonDisabled: false,
            addButtonDisabled: true,
            resetButtonDisabled: true,
            currentDisplayValue: HELP_MSG
        }
        )
        
        useEffect(() => {
            localInputsErrorsControlLogic()
        }, [
            localCounterState.maxValue,
            localCounterState.minValue
        ])
        
        useEffect(() => {
            increaseValueControlLogic();
        }, [
            counterState.screenValue,
            localCounterState.isValuesSeted
        ])
        
        useEffect(() => {
            displayControlLogic()
        }, [
            counterState.screenValue,
            localCounterState.inputError,
            localCounterState.setButtonDisabled
        ])

        const increaseValueControlLogic = () => {
            if (localCounterState.isValuesSeted) {
                if (counterState.screenValue >= counterState.maxValue) {
                    setLocalCounterState(prev => ({
                        ...prev,
                        addButtonDisabled: true, inputError: true
                    }))
            }
            else {
                setLocalCounterState(prev => ({
                    ...prev,
                    addButtonDisabled: false, inputError: false
                }))
            }
        }
        else {
            setLocalCounterState(prev => ({
                ...prev,
                addButtonDisabled: true
            }))
        }
    }
    
    const resetButtonControlLogic = () => {
        if (localCounterState.isValuesSeted) {
            if (counterState.screenValue === counterState.minValue) {
                setLocalCounterState(prev => ({
                    ...prev,
                    resetButtonDisabled: true
                }))
            }
            else {
                setLocalCounterState(prev => ({
                    ...prev,
                    resetButtonDisabled: false
                }))
            }
        }
        else {
            setLocalCounterState(prev => ({
                ...prev,
                resetButtonDisabled: true
            }))
        }
    }

    const localInputsErrorsControlLogic = () => {
        if (localCounterState.minValue < '0' && localCounterState.maxValue < '0') {
            setLocalCounterState(prev => ({
                ...prev,
                isMaxValueError: true, isMinValueError: true, setButtonDisabled: true, inputError: true
            }))
        }
        else if (localCounterState.minValue < '0') {
            setLocalCounterState(prev => ({
                ...prev,
                isMaxValueError: false, isMinValueError: true, setButtonDisabled: true, inputError: true
            }))
        }
        else if (localCounterState.maxValue < '0') {
            setLocalCounterState(prev => ({
                ...prev,
                isMaxValueError: true, isMinValueError: false, setButtonDisabled: true, inputError: true
            }))
        }
        else if (localCounterState.minValue >= localCounterState.maxValue) {
            setLocalCounterState(prev => ({
                ...prev,
                isMaxValueError: true, isMinValueError: true, setButtonDisabled: true, inputError: true
            }))
        }
        else {
            setLocalCounterState(prev => ({
                ...prev,
                isMaxValueError: false, isMinValueError: false, inputError: false
            }))
        }
    }

    const displayControlLogic = () => {
        if (localCounterState.inputError) {
            if (localCounterState.isValuesSeted) {
                setLocalCounterState(prev => ({
                    ...prev,
                    currentDisplayValue: counterState.screenValue
                }))
            }
            else {
                setLocalCounterState(prev => ({
                    ...prev,
                    currentDisplayValue: ERROR_MSG
                }))
            }
        }
        else {
            if (localCounterState.isValuesSeted) {
                setLocalCounterState(prev => ({
                    ...prev,
                    currentDisplayValue: counterState.screenValue
                }))
            }
            else {
                setLocalCounterState(prev => ({
                    ...prev,
                    currentDisplayValue: HELP_MSG
                }))
            }
        }
        resetButtonControlLogic()
    }




    const maxValueLocalOnChange = (value: string) => {
        setLocalCounterState(prev => ({ ...prev, maxValue: value, setButtonDisabled: false, isValuesSeted: false }))
    }

    const minValueLocalOnChange = (value: string) => {
        setLocalCounterState(prev => ({ ...prev, minValue: value, setButtonDisabled: false, isValuesSeted: false }))
    }

    const onSetClickHandler = useCallback(() => {
        setMinMaxValues(localCounterState.minValue, localCounterState.maxValue)
        setLocalCounterState({ ...localCounterState, setButtonDisabled: true, isValuesSeted: true })
    }, [localCounterState.minValue, localCounterState.maxValue, localCounterState.inputError])

    const setMinMaxValues = (minValue: string, maxValue: string) => {
        dispatch(setMinMaxValuesAC(minValue, maxValue))
        //saveToLocalStorage(valuesObject)
    }

    const increaseScreenValue = () => {
        dispatch(increaseScreenValueAC())
    }

    const resetScreenValue = () => {
        dispatch(ResetScreenValueAC())
        displayControlLogic()
    }

    // const saveToLocalStorage = (values: MinMaxValuesObjectType) => {
    //     localStorage.setItem('localCounterState', JSON.stringify(values))
    // }

    // const getFromLocalStorage = () => {
    //     let localStorageValues = localStorage.getItem('localCounterState')
    //     if (localStorageValues !== null && localStorageValues !== undefined) {
    //         const localStorageParsedValues = JSON.parse(localStorageValues)
    //         console.log(localStorageParsedValues)
    //         setMinMaxValues({
    //             maxValue: localStorageParsedValues.maxValue,
    //             minValue: localStorageParsedValues.minValue
    //         })
    //         setIsSetButtonDisabled(true)
    //     }
    //     else {
    //         saveToLocalStorage({ maxValue: counterState.maxValue, minValue: counterState.minValue })
    //     }

    // }


    return (
        <Wrapper direction="row" variant="common" gap="20px">
            <Settings
                maxValue={localCounterState.maxValue}
                minValue={localCounterState.minValue}
                isMaxValueError={localCounterState.isMaxValueError}
                isMinValueError={localCounterState.isMinValueError}
                setButtonDisabled={localCounterState.setButtonDisabled}
                onSetClickHandler={onSetClickHandler}
                maxValueLocalOnChange={maxValueLocalOnChange}
                minValueLocalOnChange={minValueLocalOnChange}
            />
            <Display
                displayValue={localCounterState.currentDisplayValue}
                inputError={localCounterState.inputError}
                addButtonDisabled={localCounterState.addButtonDisabled}
                resetButtonDisabled={localCounterState.resetButtonDisabled}
                increaseScreenValue={increaseScreenValue}
                resetScreenValue={resetScreenValue}
            />
        </Wrapper>
    )
})