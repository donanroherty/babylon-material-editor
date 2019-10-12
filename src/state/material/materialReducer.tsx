import { ActionsUnion } from 'state/ActionCreator'
import { Material } from 'types/types'
import {
  MaterialActions,
  ACTION_SET_BASE_COLOR,
  ACTION_SET_ALBEDO_TEXTURE,
  ACTION_SET_ROUGHNESS,
  ACTION_SET_METALLIC
} from './MaterialActions'

export type MaterialAcceptedActions = ActionsUnion<typeof MaterialActions>
export interface MaterialState extends Material {}
export const materialInitialState: MaterialState = {
  name: 'mat_01',
  albedoTexture: '',
  baseColor: { r: 150, g: 150, b: 150 },
  roughnessTexture: '',
  roughness: 0.2,
  metallicTexture: '',
  metallic: 0.0
}

export function materialReducer(
  state: MaterialState,
  action: MaterialAcceptedActions
) {
  switch (action.type) {
    case ACTION_SET_BASE_COLOR:
      return { ...state, baseColor: action.payload }
    case ACTION_SET_ALBEDO_TEXTURE:
      return state
    case ACTION_SET_ROUGHNESS:
      const newRoughness =
        action.payload > 1 ? 1 : action.payload < 0 ? 0 : action.payload
      return { ...state, roughness: newRoughness }
    case ACTION_SET_METALLIC:
      const newMetallic =
        action.payload > 1 ? 1 : action.payload < 0 ? 0 : action.payload
      return { ...state, metallic: newMetallic }
    default:
      throw new Error('invalid action type passed to reducer')
  }
}
