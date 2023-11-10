import { Button } from "./Button"
import { Input } from "./Input"
import { Wrapper } from "./Wrapper.styled"

export const SettingsScreen = () => {

    const onClickSetHandler = () => {
        alert("onClickSetHandler")
    }

    return (
        <Wrapper direction="column" variant="bordered" padding="20px" gap="20px">
            <Input value={1}/>
            <Input value={1}/>
            <Button name="Set" onClick={onClickSetHandler}/>
        </Wrapper>
    )
}