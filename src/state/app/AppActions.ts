import { createActionPayload } from 'state/ActionCreator'

export const ACTION_SELECT_MATERIAL = 'SELECT_MATERIAL'

export const AppActions = {
  setMaterial: createActionPayload<typeof ACTION_SELECT_MATERIAL, number>(
    ACTION_SELECT_MATERIAL
  )
}
