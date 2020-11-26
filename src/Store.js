import React, {createContext, useReducer} from "react";
import CountriesReducer from './reducers/CountriesReducer'


const initialState = {
    results: [],
    currentPageNumber: 1,
    totalPages: 0,
    searchPhrase:""
};

const Store = ({children}) => {
    const [state, dispatch] = useReducer(CountriesReducer, initialState);
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState);
export default Store;