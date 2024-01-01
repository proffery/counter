import { GlobalCounterState } from "../AppWithReduxCounter"
import { MinMaxValuesObjectType } from "../components/Settings"

const SET_MIN_MAX_VALUES = 'SET-MIN-MAX-VALUES'
const INCREASE_SCREEN_VALUE = 'INCREASE-SCREEN-VALUE'
const RESET_SCREEN_VALUE = 'RESET-SCREEN-VALUE'
const SET_GLOBAL_ERROR = 'SET-GLOBAL-ERROR'
const SET_IS_SET_BUTTON_DISABLED = 'SET-IS-SET-BUTTON-DISABLED'
const SET_IS_ADD_BUTTON_DISABLED = 'SET-IS-ADD-BUTTON-DISABLED'
const SET_IS_RESET_BUTTON_DISABLED = 'SET-IS-RESET-BUTTON-DISABLED'

const initialState: GlobalCounterState = {
    minValue: '0',
    maxValue: '5',
    screenValue: '0',
    step: '1',
    inputError: false,
    setButtonDisabled: true,
    addButtonDisabled: false,
    resetButtonDisabled: true
}

type ActionsType = SetMinMaxValuesAC | IncreaseScreenValueACType | ResetScreenValueACType
    | SetGlobalErrorACType | SetIsSetButtonDisabledACType | SetIsAddButtonDisabledACType
    | SetIsResetButtonDisabledACType

export const counterReducer = (state: GlobalCounterState = initialState, action: ActionsType): GlobalCounterState => {
    switch (action.type) {
        case SET_MIN_MAX_VALUES:
            return {
                ...state,
                maxValue: action.payload.valuesObject.maxValue,
                minValue: action.payload.valuesObject.minValue,
                screenValue: action.payload.valuesObject.minValue
            }
        case INCREASE_SCREEN_VALUE:
            return {
                ...state,
                screenValue: (Number(state.screenValue) + Number(state.step)).toString()
            }
        case RESET_SCREEN_VALUE:
            return {
                ...state,
                screenValue: state.minValue,
                inputError: false
            }
        case SET_GLOBAL_ERROR:
            return {
                ...state,
                inputError: action.payload.isError
            }
        case SET_IS_SET_BUTTON_DISABLED:
            return {
                ...state,
                setButtonDisabled: action.payload.isDisabled
            }
        case SET_IS_ADD_BUTTON_DISABLED:
            return {
                ...state,
                addButtonDisabled: action.payload.isDisabled
            }
        case SET_IS_RESET_BUTTON_DISABLED:
            return {
                ...state,
                resetButtonDisabled: action.payload.isDisabled
            }
        default:
            return state
    }
}

type SetMinMaxValuesAC = ReturnType<typeof setMinMaxValuesAC>
export const setMinMaxValuesAC = (valuesObject: MinMaxValuesObjectType) => {
    return {
        type: SET_MIN_MAX_VALUES,
        payload: {
            valuesObject
        }
    } as const
}

type IncreaseScreenValueACType = ReturnType<typeof increaseScreenValueAC>
export const increaseScreenValueAC = () => {
    return {
        type: INCREASE_SCREEN_VALUE
    } as const
}

type ResetScreenValueACType = ReturnType<typeof ResetScreenValueAC>
export const ResetScreenValueAC = () => {
    return {
        type: RESET_SCREEN_VALUE
    } as const
}

type SetGlobalErrorACType = ReturnType<typeof setGlobalErrorAC>
export const setGlobalErrorAC = (isError: boolean) => {
    return {
        type: SET_GLOBAL_ERROR,
        payload: {
            isError
        }
    } as const
}

type SetIsSetButtonDisabledACType = ReturnType<typeof setIsSetButtonDisabledAC>
export const setIsSetButtonDisabledAC = (isDisabled: boolean) => {
    return {
        type: SET_IS_SET_BUTTON_DISABLED,
        payload: {
            isDisabled
        }
    } as const
}

type SetIsAddButtonDisabledACType = ReturnType<typeof setIsAddButtonDisabledAC>
export const setIsAddButtonDisabledAC = (isDisabled: boolean) => {
    return {
        type: SET_IS_ADD_BUTTON_DISABLED,
        payload: {
            isDisabled
        }
    } as const
}

type SetIsResetButtonDisabledACType = ReturnType<typeof setIsResetButtonDisabledAC>
export const setIsResetButtonDisabledAC = (isDisabled: boolean) => {
    return {
        type: SET_IS_RESET_BUTTON_DISABLED,
        payload: {
            isDisabled
        }
    } as const
} 