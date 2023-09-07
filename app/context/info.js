import { createContext } from "react"
import useSWR from "swr"
import { isLoggedIn } from "../redux/state/slices/api/setAuthHeaders"


const defaultProvider = {
    cart: 0
}

const DataContext = createContext(defaultProvider)
const DataProvider = ({ children }) => {
    const { data: cartData, loading:cartLoading, error:cartError} = useSWR(isLoggedIn() ? "/user/cart" : null)

    return (
        <DataContext.Provider value={{
            cart: !cartLoading && cartData && !cartError ? cartData?.data[0] : []
        }}>
            {children}
        </DataContext.Provider>
    )
}

export {DataProvider, DataContext}