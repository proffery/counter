import { Wrapper } from "./Wrapper.styled"
import { Button } from "./Button"
import { Screen } from "./Screen"

type ActionPropsType = {
    screenValue: number
    minValue: number
    maxValue: number
    inputError: boolean
    isValueSet: boolean
    increaseScreenValue: () => void
    resetScreenValue: () => void
}

export const ActionScreen = (props:ActionPropsType) => {

    const incHandler = () => {
        props.increaseScreenValue()
    }

    const resetHandler = () => {
        props.resetScreenValue()
    }
    return (
        <Wrapper direction='column' variant='bordered' padding="20px" gap="20px">
        <Screen screenValue={props.screenValue} 
            maxValue={props.maxValue} 
            inputError={props.inputError}
            isValueSet={props.isValueSet}
        />
        <Wrapper direction='row' variant='common' gap="20px">
          <Button name='Add' onClick={incHandler} isDisabled={props.screenValue >= props.maxValue || !props.isValueSet ? true : false} />
          <Button name='Reset' onClick={resetHandler} isDisabled={props.screenValue <= props.minValue || !props.isValueSet ?  true : false} />
        </Wrapper>
      </Wrapper>
    )
}