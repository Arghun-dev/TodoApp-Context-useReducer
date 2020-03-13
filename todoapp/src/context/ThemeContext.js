import React, {createContext, useReducer} from 'react';
import * as Reducer from '../store/Reducers/Reducers';

export const ThemeContext = createContext();

const ThemeProvider = (props) => {
    const [theme, setTheme] = useReducer(Reducer.ThemeReducer, Reducer.initialThemeStatus);
    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;