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
        setButtonDisabled: boolean
        addButtonDisabled: boolean
        resetButtonDisabled: boolean
        currentDisplayValue: string
    }
    const counterState = useSelector<AppRootStateType, GlobalCounterState>(store => store.counter)
    const dispatch = useDispatch()
    const [localCounterState, setLocalCounterState] = useState<LocalCounterState>(
        {
            maxValue: '5',
            minValue: '0',
            isMaxValueError: false,
            isMinValueError: false,
            inputError: false,
            setButtonDisabled: false,
            addButtonDisabled: false,
            resetButtonDisabled: true,
            currentDisplayValue: HELP_MSG
        }
    )

    const increaseValueControlLogic = useCallback(() => {
        if (Number(counterState.screenValue) >= Number(counterState.maxValue)) {
            setLocalCounterState({
                ...localCounterState,
                addButtonDisabled: true, inputError: true
            })
        }
        else {
            setLocalCounterState({
                ...localCounterState,
                addButtonDisabled: false, inputError: false
            })
        }
    }, [counterState.maxValue, counterState.screenValue])

    const resetButtonControlLogic = useCallback(() => {
        if (Number(counterState.screenValue) === Number(counterState.minValue)) {
            setLocalCounterState({
                ...localCounterState,
                resetButtonDisabled: true
            })
        }
        else {
            setLocalCounterState({
                ...localCounterState,
                resetButtonDisabled: false
            })
        }
    }, [counterState.minValue, counterState.screenValue])

    const localInputsErrorsControlLogic = () => {
        if (Number(localCounterState.minValue) < 0 && Number(localCounterState.maxValue) < 0) {
            setLocalCounterState({
                ...localCounterState,
                isMaxValueError: true, isMinValueError: true, setButtonDisabled: true, inputError: true
            })
        }
        else if (Number(localCounterState.minValue) < 0) {
            setLocalCounterState({
                ...localCounterState,
                isMaxValueError: false, isMinValueError: true, setButtonDisabled: true, inputError: true
            })
        }
        else if (Number(localCounterState.maxValue) < 0) {
            setLocalCounterState({
                ...localCounterState,
                isMaxValueError: true, isMinValueError: false, setButtonDisabled: true, inputError: true
            })
        }
        else if (Number(localCounterState.minValue) >= Number(localCounterState.maxValue)) {
            setLocalCounterState({
                ...localCounterState,
                isMaxValueError: true, isMinValueError: true, setButtonDisabled: true, inputError: true
            })
        }
        else {
            setLocalCounterState({
                ...localCounterState,
                isMaxValueError: true, isMinValueError: false, setButtonDisabled: false, inputError: false
            })
        }
    }

    const displayControlLogic = () => {
        if (localCounterState.inputError) {
            if (Number(counterState.screenValue) >= Number(counterState.maxValue)) {
                setLocalCounterState({
                    ...localCounterState,
                    currentDisplayValue: counterState.screenValue, addButtonDisabled: true
                })
            }
            else {
                setLocalCounterState({
                    ...localCounterState,
                    currentDisplayValue: ERROR_MSG, addButtonDisabled: true
                })
            }
        }
        else {
            if (localCounterState.setButtonDisabled) {
                setLocalCounterState({
                    ...localCounterState,
                    currentDisplayValue: counterState.screenValue, addButtonDisabled: false
                })
            }
            else {
                setLocalCounterState({
                    ...localCounterState,
                    currentDisplayValue: HELP_MSG, addButtonDisabled: true
                })
            }
        }
    }

    useEffect(() => {
        setLocalCounterState({
            ...localCounterState,
            maxValue: counterState.maxValue, minValue: counterState.minValue
        })
    }, [counterState.maxValue, counterState.minValue])

    useEffect(() => {
        displayControlLogic()
    }, [
        localCounterState.resetButtonDisabled,
        localCounterState.addButtonDisabled,
        counterState.screenValue,
        localCounterState.inputError,
        localCounterState.setButtonDisabled
    ])

    useEffect(() => {
        localInputsErrorsControlLogic()
    }, [localCounterState.maxValue, localCounterState.minValue])

    useEffect(() => {
        increaseValueControlLogic();
    }, [counterState.screenValue])

    useEffect(() => {
        resetButtonControlLogic();
    }, [counterState.screenValue, counterState.minValue])


    const maxValueLocalOnChange = (value: string) => {
        setLocalCounterState({ ...localCounterState, maxValue: value, setButtonDisabled: false })
    }
    const minValueLocalOnChange = (value: string) => {
        setLocalCounterState({ ...localCounterState, minValue: value, setButtonDisabled: false })
    }

    const onSetClickHandler = () => {
        setLocalCounterState({ ...localCounterState, setButtonDisabled: true })
        setMinMaxValues(localCounterState.minValue, localCounterState.maxValue)
    }

    const setMinMaxValues = useCallback((minValue: string, maxValue: string) => {
        dispatch(setMinMaxValuesAC(minValue, maxValue))
        //saveToLocalStorage(valuesObject)
    }, [])

    const increaseScreenValue = useCallback(() => {
        dispatch(increaseScreenValueAC())
    }, [])

    const resetScreenValue = useCallback(() => {
        dispatch(ResetScreenValueAC())
    }, [])

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