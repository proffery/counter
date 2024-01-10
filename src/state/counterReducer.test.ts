import { GlobalCounterState, ResetScreenValueAC, STEP, counterReducer, increaseScreenValueAC, setMinMaxValuesAC } from "./counterReducer"
let startState: GlobalCounterState

beforeEach(() => {
    startState = {
        minValue: Math.random().toString(),
        maxValue: Math.random().toString(),
        screenValue: Math.random().toString(),

    }
})

test('Correct values should be setted', () => {
    const action = setMinMaxValuesAC(Math.random().toString(), Math.random().toString())
    const endState = counterReducer(startState, action)
    expect(endState).toEqual({
        minValue: action.payload.minValue,
        maxValue: action.payload.maxValue,
        screenValue: action.payload.minValue,
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
    })
})