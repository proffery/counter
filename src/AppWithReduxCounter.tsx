import { useEffect } from 'react';
import { Settings, MinMaxValuesObjectType } from './components/Settings';
import { Wrapper } from './components/Wrapper.styled';
import { Display } from './components/Display';
import './App.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { ResetScreenValueAC, increaseScreenValueAC, setGlobalErrorAC, setIsAddButtonDisabledAC, setIsResetButtonDisabledAC, setIsSetButtonDisabledAC, setMinMaxValuesAC } from './state/counterReducer';
import { AppRootStateType } from './state/store';


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


export function AppWithReduxCounter() {
    const counterState = useSelector<AppRootStateType, GlobalCounterState>(store => store.counter)
    const dispatch = useDispatch()


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
        increaseValueControlLogic();
    }, [counterState.screenValue, counterState.maxValue])

    useEffect(() => {
        resetButtonControlLogic();
    }, [counterState.screenValue, counterState.minValue])

    const setMinMaxValues = (valuesObject: MinMaxValuesObjectType) => {
        dispatch(setMinMaxValuesAC(valuesObject))
        //saveToLocalStorage(valuesObject)
    }

    const increaseScreenValue = () => {
        dispatch(increaseScreenValueAC())
    }

    const resetScreenValue = () => {
        dispatch(ResetScreenValueAC())
    }

    const setGlobalError = (isError: boolean) => {
        dispatch(setGlobalErrorAC(isError))
    }

    const setIsSetButtonDisabled = (isDisabled: boolean) => {
        dispatch(setIsSetButtonDisabledAC(isDisabled))
    }

    const setIsAddButtonDisabled = (isDisabled: boolean) => {
        dispatch(setIsAddButtonDisabledAC(isDisabled))
    }

    const setIsResetButtonDisabled = (isDisabled: boolean) => {
        dispatch(setIsResetButtonDisabledAC(isDisabled))
    }

    // const saveToLocalStorage = (values: MinMaxValuesObjectType) => {
    //     localStorage.setItem('localCounterState', JSON.stringify(values))
    // }

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
        <Wrapper direction="row" variant="common" gap="20px" className='App'>
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