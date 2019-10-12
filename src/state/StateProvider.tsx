/**
 * StateProvider
 * Creates a Context Provider to supply state to a tree of child components
 * StateProvider wraps all components which need access to state reducers
 * StateContext ensures that all sub-components of StateProvider use the same instance of state
 * by passing state reducers to all children via its value prop
 */

import React, { useReducer, createContext, Dispatch } from 'react'
import {
  appReducer,
  AppState,
  appInitialState,
  AppAcceptedActions
} from './app/appReducer'

// Type for providers value prop
type AppContextType = {
  useAppReducer: () => [AppState, Dispatch<AppAcceptedActions>]
}
const StateContext = createContext<AppContextType | undefined>(undefined)

// StateProvider wraps <App/> in index.tsx
export function StateProvider(props: any) {
  const useAppReducer = () => useReducer(appReducer, appInitialState)

  return <StateContext.Provider value={{ useAppReducer }} {...props} />
}

// Use app state is imported and called in any component which needs access to state reducers
export default function useAppState() {
  const context = React.useContext(StateContext)
  if (!context)
    throw new Error('useAppReducer must be used within a StateProvider')

  const { useAppReducer } = context

  return { useAppReducer }
}
