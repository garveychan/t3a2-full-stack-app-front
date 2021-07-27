// Create a global state context which can be accessed by any child
// component in the application without having to receive props down the tree.

import {createContext, useContext} from 'react'

export const GlobalContext = createContext()

export const useGlobalState = () => useContext(GlobalContext)