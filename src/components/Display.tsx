import { Wrapper } from "./Wrapper"
import { Button } from "./Button"
import { Screen } from "./Screen"
import { memo, useCallback, useEffect, useState } from "react"

type DisplayPropsType = {
    maxValue: string
    screenValue: string
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
    const ERROR_MSG = "Incorect input value"
    const HELP_MSG = "Set values and press \"set\" button"
    const [displayValue, setDisplayValue] = useState(HELP_MSG)

    const displayControlLogic = () => {
        if (props.inputError) {
            if (Number(props.screenValue) >= Number(props.maxValue)) {
                if (props.setButtonDisabled) {
                    setDisplayValue(props.screenValue)
                    props.setIsAddButtonDisabled(true)
                }
                else{
                    setDisplayValue(ERROR_MSG)
                    props.setIsAddButtonDisabled(true)
                }
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
    }, [props.screenValue, props.setButtonDisabled, props.resetButtonDisabled, props.inputError])

    const incHandler = useCallback(() => {
        props.increaseScreenValue()
    }, [props.increaseScreenValue])

    const resetHandler = useCallback(() => {
        props.resetScreenValue()
    }, [props.resetScreenValue])

    // const isAddButtonDisabled = props.maxValue === props.screenValue
    
    return (
        <Wrapper
            direction={'column'}
            variant={'bordered'}
            justify={"space-around"}
            padding={"20px"}
            height={"250px"}
            width="250px"
            gap={"20px"}
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