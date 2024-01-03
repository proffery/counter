import { Wrapper } from "./Wrapper.styled"
import { Button } from "./Button"
import { Screen } from "./Screen"
import { memo, useCallback, useEffect, useState } from "react"

type DisplayPropsType = {
    maxValue:string
    screenValue:string
    inputError: boolean
    setButtonDisabled: boolean
    addButtonDisabled: boolean
    resetButtonDisabled: boolean
    increaseScreenValue: () => void
    resetScreenValue: () => void
    setIsAddButtonDisabled: (isDisabled: boolean) => void
}

export const Display = memo((props: DisplayPropsType) => {
    console.log("DISPLAY RENDERED");
    const ERROR_MSG = "Incorect value"
    const HELP_MSG = "Enter values and press \"set\""
    const [displayValue, setDisplayValue] = useState(HELP_MSG)

    const displayControlLogic = () => {
        if (props.inputError) {
            if (Number(props.screenValue) >= Number(props.maxValue)) {
                setDisplayValue(props.screenValue)
                props.setIsAddButtonDisabled(true)
            }
            else {
                setDisplayValue(ERROR_MSG)
                props.setIsAddButtonDisabled(true)
            }
        }
        else {
            if (props.setButtonDisabled) {
                setDisplayValue(props.screenValue)
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
    }, [props.screenValue, props.setButtonDisabled, props.resetButtonDisabled])

    const incHandler = useCallback(() => {
        props.increaseScreenValue()
    },[props.increaseScreenValue])

    const resetHandler = useCallback(() => {
        props.resetScreenValue()
    },[props.resetScreenValue])

    return (
        <Wrapper
            direction='column'
            variant='bordered'
            justify="space-between"
            padding="20px"
            minheight="200px" gap="20px"
        >
            <Screen displayValue={displayValue}
                isInputError={props.inputError}
            />
            <Wrapper direction='row' variant='common' gap="20px">
                <Button name='Add'
                    onClick={incHandler}
                    isDisabled={props.addButtonDisabled} />
                <Button name='Reset'
                    onClick={resetHandler}
                    isDisabled={props.resetButtonDisabled} />
            </Wrapper>
        </Wrapper>
    )
})