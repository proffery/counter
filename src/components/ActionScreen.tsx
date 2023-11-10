import { useState } from "react"
import { Wrapper } from "./Wrapper.styled"
import { Button } from "./Button"
import { Screen } from "./Screen"

export const ActionScreen = () => {
    const [screenValue, setScreenValue] = useState(0)
    const maxVal = 5
    const minVal = 0
    const step = 1

    const addHandler = () => {
        setScreenValue(screenValue + step)
    }

    const resetHandler = () => {
        setScreenValue(minVal)
    }
    return (
        <Wrapper direction='column' variant='bordered' padding="20px" gap="20px">
        <Screen screenValue={screenValue} maxVal={maxVal} />
        <Wrapper direction='row' variant='common' gap="20px">
          <Button name='Add' onClick={addHandler} isDisabled={screenValue >= maxVal ? true : false} />
          <Button name='Reset' onClick={resetHandler} isDisabled={screenValue <= minVal ? true : false} />
        </Wrapper>
      </Wrapper>
    )
}