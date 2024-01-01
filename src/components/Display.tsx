import { Wrapper } from "./Wrapper.styled"
import { Button } from "./Button"
import { Screen } from "./Screen"
import { CounterState } from "../AppCounter"
import { useEffect, useState } from "react"

type DisplayPropsType = {
    globalCounterState: CounterState
    increaseScreenValue: () => void
    resetScreenValue: () => void
    setIsAddButtonDisabled: (isDisabled: boolean) => void
}

export const Display = (props: DisplayPropsType) => {
    const ERROR_MSG = "Incorect value"
    const HELP_MSG = "Enter values and press \"set\""
    const [displayValue, setDisplayValue] = useState(HELP_MSG)
    useEffect(() => {
        if (props.globalCounterState.inputError) {
            if (Number(props.globalCounterState.screenValue) >= Number(props.globalCounterState.maxValue )) {
                setDisplayValue(props.globalCounterState.screenValue)
            }
            else {
                setDisplayValue(ERROR_MSG)
            }
        }
        else {
            if (props.globalCounterState.setButtonDisabled) {
                setDisplayValue(props.globalCounterState.screenValue)
                props.setIsAddButtonDisabled(false)
            }
            else {
                setDisplayValue(HELP_MSG)
                props.setIsAddButtonDisabled(true)
            }
        }
    }, [props.globalCounterState.inputError, props.globalCounterState.setButtonDisabled, props.increaseScreenValue])

    const incHandler = () => {
        props.increaseScreenValue()
    }

    const resetHandler = () => {
        props.resetScreenValue()
    }

    return (
        <Wrapper direction='column' variant='bordered' padding="20px" gap="20px">
            <Screen displayValue={displayValue}
                isInputError={props.globalCounterState.inputError}
            />
            <Wrapper direction='row' variant='common' gap="20px">
                <Button name='Add'
                    onClick={incHandler}
                    isDisabled={props.globalCounterState.addButtonDisabled} />
                <Button name='Reset'
                    onClick={resetHandler}
                    isDisabled={props.globalCounterState.resetButtonDisabled} />
            </Wrapper>
        </Wrapper>
    )
}