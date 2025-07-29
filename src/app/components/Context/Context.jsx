'use client'

import React from 'react'
import { createContext,useContext,useState } from 'react'

const AppContext = createContext()

export const AppProvider = ({children}) => {
    const [IdJumio,setIdJumio] = useState('')

    return (
        <AppContext.Provider value={{IdJumio,setIdJumio}}>
            {children}
        </AppContext.Provider>
    )
}
export const useAppContext = () => {
    return useContext(AppContext)
}