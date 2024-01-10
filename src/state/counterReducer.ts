const SET_MIN_MAX_VALUES = 'SET-MIN-MAX-VALUES'
const INCREASE_SCREEN_VALUE = 'INCREASE-SCREEN-VALUE'
const RESET_SCREEN_VALUE = 'RESET-SCREEN-VALUE'
// const SET_GLOBAL_ERROR = 'SET-GLOBAL-ERROR'
// const SET_IS_SET_BUTTON_DISABLED = 'SET-IS-SET-BUTTON-DISABLED'
// const SET_IS_ADD_BUTTON_DISABLED = 'SET-IS-ADD-BUTTON-DISABLED'
// const SET_IS_RESET_BUTTON_DISABLED = 'SET-IS-RESET-BUTTON-DISABLED'

export const STEP = 1

export type GlobalCounterState = {
    minValue: string
    maxValue: string
    screenValue: string
}
const initialState: GlobalCounterState = {
    minValue: '0',
    maxValue: '5',
    screenValue: '0',
}

type ActionsType = SetMinMaxValuesAC | IncreaseScreenValueACType | ResetScreenValueACType

export const counterReducer = (state: GlobalCounterState = initialState, action: ActionsType): GlobalCounterState => {
    switch (action.type) {
        case SET_MIN_MAX_VALUES:
            return {
                ...state,
                maxValue: action.payload.maxValue,
                minValue: action.payload.minValue,
                screenValue: action.payload.minValue
            }
        case INCREASE_SCREEN_VALUE:
            return {
                ...state,
                screenValue: (Number(state.screenValue) + Number(STEP)).toString()
            }
        case RESET_SCREEN_VALUE:
            return {
                ...state,
                screenValue: state.minValue,
            }
        // case SET_GLOBAL_ERROR:
        //     return {
        //         ...state,
        //         inputError: action.payload.isError
        //     }
        // case SET_IS_SET_BUTTON_DISABLED:
        //     return {
        //         ...state,
        //         setButtonDisabled: action.payload.isDisabled
        //     }
        // case SET_IS_ADD_BUTTON_DISABLED:
        //     return {
        //         ...state,
        //         addButtonDisabled: action.payload.isDisabled
        //     }
        // case SET_IS_RESET_BUTTON_DISABLED:
        //     return {
        //         ...state,
        //         resetButtonDisabled: action.payload.isDisabled
        //     }
        default:
            return state
    }
}

type SetMinMaxValuesAC = ReturnType<typeof setMinMaxValuesAC>
export const setMinMaxValuesAC = (minValue:string, maxValue:string) => {
    return {
        type: SET_MIN_MAX_VALUES,
        payload: {
            minValue,
            maxValue
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

// type SetGlobalErrorACType = ReturnType<typeof setInputGlobalErrorAC>
// export const setInputGlobalErrorAC = (isError: boolean) => {
//     return {
//         type: SET_GLOBAL_ERROR,
//         payload: {
//             isError
//         }
//     } as const
// }

// type SetIsSetButtonDisabledACType = ReturnType<typeof setIsSetButtonDisabledAC>
// export const setIsSetButtonDisabledAC = (isDisabled: boolean) => {
//     return {
//         type: SET_IS_SET_BUTTON_DISABLED,
//         payload: {
//             isDisabled
//         }
//     } as const
// }

// type SetIsAddButtonDisabledACType = ReturnType<typeof setIsAddButtonDisabledAC>
// export const setIsAddButtonDisabledAC = (isDisabled: boolean) => {
//     return {
//         type: SET_IS_ADD_BUTTON_DISABLED,
//         payload: {
//             isDisabled
//         }
//     } as const
// }

// type SetIsResetButtonDisabledACType = ReturnType<typeof setIsResetButtonDisabledAC>
// export const setIsResetButtonDisabledAC = (isDisabled: boolean) => {
//     return {
//         type: SET_IS_RESET_BUTTON_DISABLED,
//         payload: {
//             isDisabled
//         }
//     } as const
// } 