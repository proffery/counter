import { ActionScreen } from "./ActionScreen"
import { SettingsScreen } from "./SettingsScreen"
import { Wrapper } from "./Wrapper.styled"


export const CounterOne = () => {
    
    return (
    <Wrapper direction="row" variant="common" gap="20px">
        <SettingsScreen />
        <ActionScreen />
    </Wrapper>
    )
}