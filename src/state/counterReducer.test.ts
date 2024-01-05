import { GlobalCounterState } from "../AppWithReduxCounter"
import { ResetScreenValueAC, STEP, counterReducer, increaseScreenValueAC, setInputGlobalErrorAC, setIsAddButtonDisabledAC, setIsResetButtonDisabledAC, setIsSetButtonDisabledAC, setMinMaxValuesAC } from "./counterReducer"
let startState: GlobalCounterState

beforeEach(() => {
    startState = {
        minValue: Math.random().toString(),
        maxValue: Math.random().toString(),
        screenValue: Math.random().toString(),
        inputError: false,
        setButtonDisabled: true,
        addButtonDisabled: false,
        resetButtonDisabled: true
    }
})

test('Correct values should be setted', () => {
    const action = setMinMaxValuesAC({ maxValue: Math.random().toString(), minValue: Math.random().toString() })
    const endState = counterReducer(startState, action)
    expect(endState).toEqual({
        minValue: action.payload.valuesObject.minValue,
        maxValue: action.payload.valuesObject.maxValue,
        screenValue: action.payload.valuesObject.minValue,
        inputError: false,
        setButtonDisabled: true,
        addButtonDisabled: false,
        resetButtonDisabled: true
    })
})
test('Screen value should be increased by STEP', () => {
    const action = increaseScreenValueAC()
    const endState = counterReducer(startState, action)
    expect(endState.screenValue).toBe((Number(startState.screenValue) + STEP).toString())
    expect(endState).toEqual({
        minValue: startState.minValue,
        maxValue: startState.maxValue,
        screenValue: (Number(startState.screenValue) + STEP).toString(),
        inputError: false,
        setButtonDisabled: true,
        addButtonDisabled: false,
        resetButtonDisabled: true
    })
})

test('Screen value should be set to minValue', () => {
    expect(startState.screenValue).not.toBe(startState.minValue)
    const action = ResetScreenValueAC()
    const endState = counterReducer(startState, action)
    expect(endState.screenValue).toBe(startState.minValue)
    expect(endState).toEqual({
        minValue: startState.minValue,
        maxValue: startState.maxValue,
        screenValue: startState.minValue,
        inputError: false,
        setButtonDisabled: true,
        addButtonDisabled: false,
        resetButtonDisabled: true
    })
})

test('Input Error should be set to correct value', () => {
    const action = setInputGlobalErrorAC(true)
    expect(startState.inputError).not.toBe(action.payload.isError)
    const endState = counterReducer(startState, action)
    expect(endState.inputError).toBe(action.payload.isError)
    expect(endState).toEqual({
        minValue: startState.minValue,
        maxValue: startState.maxValue,
        screenValue: startState.screenValue,
        inputError: true,
        setButtonDisabled: true,
        addButtonDisabled: false,
        resetButtonDisabled: true
    })
})

test('Set Button should be set correct value', () => {
    const action = setIsSetButtonDisabledAC(false)
    expect(startState.setButtonDisabled).not.toBe(action.payload.isDisabled)
    const endState = counterReducer(startState, action)
    expect(endState.setButtonDisabled).toBe(action.payload.isDisabled)
    expect(endState).toEqual({
        minValue: startState.minValue,
        maxValue: startState.maxValue,
        screenValue: startState.screenValue,
        inputError: false,
        setButtonDisabled: false,
        addButtonDisabled: false,
        resetButtonDisabled: true
    })
})

test('Add Button should be set correct value', () => {
    const action = setIsAddButtonDisabledAC(true)
    expect(startState.addButtonDisabled).not.toBe(action.payload.isDisabled)
    const endState = counterReducer(startState, action)
    expect(endState.addButtonDisabled).toBe(action.payload.isDisabled)
    expect(endState).toEqual({
        minValue: startState.minValue,
        maxValue: startState.maxValue,
        screenValue: startState.screenValue,
        inputError: false,
        setButtonDisabled: true,
        addButtonDisabled: true,
        resetButtonDisabled: true
    })
})

test('Reset Button should be set correct value', () => {
    const action = setIsResetButtonDisabledAC(false)
    expect(startState.resetButtonDisabled).not.toBe(action.payload.isDisabled)
    const endState = counterReducer(startState, action)
    expect(endState.resetButtonDisabled).toBe(action.payload.isDisabled)
    expect(endState).toEqual({
        minValue: startState.minValue,
        maxValue: startState.maxValue,
        screenValue: startState.screenValue,
        inputError: false,
        setButtonDisabled: true,
        addButtonDisabled: false,
        resetButtonDisabled: false
    })
})