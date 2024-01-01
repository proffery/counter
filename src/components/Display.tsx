import { Wrapper } from "./Wrapper.styled"
import { Button } from "./Button"
import { Screen } from "./Screen"
import { GlobalCounterState } from "../AppCounter"
import { useEffect, useState } from "react"

type DisplayPropsType = {
    globalCounterState: GlobalCounterState
    increaseScreenValue: () => void
    resetScreenValue: () => void
    setIsAddButtonDisabled: (isDisabled: boolean) => void
}

export const Display = (props: DisplayPropsType) => {
    const ERROR_MSG = "Incorect value"
    const HELP_MSG = "Enter values and press \"set\""
    const [displayValue, setDisplayValue] = useState(HELP_MSG)

    const displayControlLogic = () => {
        if (props.globalCounterState.inputError) {
            if (Number(props.globalCounterState.screenValue) >= Number(props.globalCounterState.maxValue)) {
                setDisplayValue(props.globalCounterState.screenValue)
                props.setIsAddButtonDisabled(true)
            }
            else {
                setDisplayValue(ERROR_MSG)
                props.setIsAddButtonDisabled(true)
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
    }

    useEffect(() => {
        displayControlLogic()
    }, [
        props.globalCounterState.resetButtonDisabled,
        props.globalCounterState.addButtonDisabled,
        props.globalCounterState.screenValue,
        props.globalCounterState.inputError,
        props.globalCounterState.setButtonDisabled
    ])

    const incHandler = () => {
        props.increaseScreenValue()
    }

    const resetHandler = () => {
        props.resetScreenValue()
    }

    return (
        <Wrapper
            direction='column'
            variant='bordered'
            justify="space-between"
            padding="20px"
            minheight="200px" gap="20px"
        >
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