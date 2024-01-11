import { Wrapper } from "./Wrapper"
import { Button } from "./Button"
import { Screen } from "./Screen"
import { memo, useCallback } from "react"

type DisplayPropsType = {
    displayValue: string
    inputError: boolean
    addButtonDisabled: boolean
    resetButtonDisabled: boolean
    increaseScreenValue: () => void
    resetScreenValue: () => void
}

export const Display = memo((props: DisplayPropsType) => {
    console.log("DISPLAY RENDERED");
    const incHandler = useCallback(() => {
        props.increaseScreenValue()
    }, [props.addButtonDisabled])

    const resetHandler = useCallback(() => {
        props.resetScreenValue()
    }, [props.resetButtonDisabled])
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
            <Screen displayValue={props.displayValue}
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