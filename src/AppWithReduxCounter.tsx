import { memo, useCallback, useEffect } from 'react';
import { Settings, MinMaxValuesObjectType } from './components/Settings';
import { Display } from './components/Display';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
    ResetScreenValueAC,
    increaseScreenValueAC,
    setInputGlobalErrorAC,
    setIsAddButtonDisabledAC,
    setIsResetButtonDisabledAC,
    setIsSetButtonDisabledAC,
    setMinMaxValuesAC
} from './state/counterReducer';
import { AppRootStateType } from './state/store';
import { Wrapper } from './components/Wrapper';


export type GlobalCounterState = {
    minValue: string
    maxValue: string
    screenValue: string
    inputError: boolean
    setButtonDisabled: boolean
    addButtonDisabled: boolean
    resetButtonDisabled: boolean
}


export const AppWithReduxCounter = memo(() => {
    console.log("APP RENDERED");
    const counterState = useSelector<AppRootStateType, GlobalCounterState>(store => store.counter)
    const dispatch = useDispatch()

    const increaseValueControlLogic = useCallback(() => {
        if (Number(counterState.screenValue) >= Number(counterState.maxValue)) {
            setIsAddButtonDisabled(true);
            setGlobalError(true);
        }
        else {
            setIsAddButtonDisabled(false);
            setGlobalError(false);
        }
    }, [counterState.maxValue, counterState.screenValue])

    const resetButtonControlLogic = useCallback(() => {
        if (Number(counterState.screenValue) === Number(counterState.minValue)) {
            setIsResetButtonDisabled(true);
        }
        else {
            setIsResetButtonDisabled(false);
        }
    }, [counterState.minValue, counterState.screenValue])

    useEffect(() => {
        increaseValueControlLogic();
    }, [counterState.screenValue])

    useEffect(() => {
        resetButtonControlLogic();
    }, [counterState.screenValue, counterState.minValue])

    const setMinMaxValues = useCallback((valuesObject: MinMaxValuesObjectType) => {
        dispatch(setMinMaxValuesAC(valuesObject))
        //saveToLocalStorage(valuesObject)
    }, [])

    const increaseScreenValue = useCallback(() => {
        dispatch(increaseScreenValueAC())
    }, [])

    const resetScreenValue = useCallback(() => {
        dispatch(ResetScreenValueAC())
    }, [])

    const setGlobalError = useCallback((isError: boolean) => {
        dispatch(setInputGlobalErrorAC(isError))
    }, [])

    const setIsSetButtonDisabled = useCallback((isDisabled: boolean) => {
        dispatch(setIsSetButtonDisabledAC(isDisabled))
    }, [])

    const setIsAddButtonDisabled = useCallback((isDisabled: boolean) => {
        dispatch(setIsAddButtonDisabledAC(isDisabled))
    }, [])

    const setIsResetButtonDisabled = useCallback((isDisabled: boolean) => {
        dispatch(setIsResetButtonDisabledAC(isDisabled))
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
                maxValue={counterState.maxValue}
                minValue={counterState.minValue}
                setButtonDisabled={counterState.setButtonDisabled}
                setValues={setMinMaxValues}
                setInputError={setGlobalError}
                setIsSetButtonDisabled={setIsSetButtonDisabled}
            />
            <Display
                maxValue={counterState.maxValue}
                screenValue={counterState.screenValue}
                inputError={counterState.inputError}
                setButtonDisabled={counterState.setButtonDisabled}
                addButtonDisabled={counterState.addButtonDisabled}
                resetButtonDisabled={counterState.resetButtonDisabled}
                increaseScreenValue={increaseScreenValue}
                resetScreenValue={resetScreenValue}
                setIsAddButtonDisabled={setIsAddButtonDisabled}
            />
        </Wrapper>
    )
})