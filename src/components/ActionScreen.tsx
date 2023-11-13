import { Wrapper } from "./Wrapper.styled"
import { Button } from "./Button"
import { Screen } from "./Screen"
import { CounterState } from "./CounterOne"

type ActionPropsType = {
    globalCounterState: CounterState
    inputError: boolean
    isValueSet: boolean
    increaseScreenValue: () => void
    resetScreenValue: () => void
}

export const ActionScreen = (props: ActionPropsType) => {

    const ERROR_MSG = "Incorect value"
    const HELP_MSG = "Enter values and press \"set\""

    const incHandler = () => {
        props.increaseScreenValue()
    }

    const resetHandler = () => {
        props.resetScreenValue()
    }

    return (
        <Wrapper direction='column' variant='bordered' padding="20px" gap="20px">
            <Screen displayValue={props.isValueSet ? props.globalCounterState.screenValue.toString() : props.inputError ? ERROR_MSG : HELP_MSG}
                isInputError={props.inputError || props.globalCounterState.screenValue >= props.globalCounterState.maxValue}
            />
            <Wrapper direction='row' variant='common' gap="20px">
                <Button name='Add'
                    onClick={incHandler}
                    isDisabled={props.globalCounterState.screenValue >= props.globalCounterState.maxValue || !props.isValueSet ? true : false} />
                <Button name='Reset'
                    onClick={resetHandler}
                    isDisabled={props.globalCounterState.screenValue <= props.globalCounterState.minValue || !props.isValueSet ? true : false} />
            </Wrapper>
        </Wrapper>
    )
}