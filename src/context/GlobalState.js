import React from 'react';
import {createContext, useReducer} from 'react';
import AppReducer from './AppReducer';

var initialState = {
    user:null,
}

export const GlobalContext  = createContext(initialState);

export const GlobalProvider = ({children}) => {

    const [state, dispatch] = useReducer(AppReducer, initialState);
    
    const updateUser = (user) => {
        //console.log("in updateUSer");

        dispatch(
            {
                type:"SET_USER",
                user:user,
            }
        )

    }
    
    
    return(

        <GlobalContext.Provider value={{updateUser:updateUser, user:state.user}}>
            {children}
        </GlobalContext.Provider>

    );
}


