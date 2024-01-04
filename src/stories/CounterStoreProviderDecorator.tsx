import { Provider } from "react-redux"
import { store } from "../state/store"

export const CounterStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={store}>{storyFn()}</Provider>
}
