import { ActionsUnion } from 'state/ActionCreator'
import { AppActions, ACTION_SELECT_MATERIAL } from './AppActions'

export type AppState = {
  selectedMaterial: number | null
}
export type AppAcceptedActions = ActionsUnion<typeof AppActions>

export const appInitialState: AppState = {
  selectedMaterial: null
}

export default function appReducer(
  state: AppState,
  action: AppAcceptedActions
): AppState {
  switch (action.type) {
    case ACTION_SELECT_MATERIAL:
      console.log(action.payload)
      return state

    default:
      throw new Error('invalid action type passed to reducer')
  }
}
