import { ActionsUnion } from 'state/ActionCreator'
import { Material } from 'types/types'
import {
  MaterialActions,
  ACTION_SET_ALBEDO_COLOR,
  ACTION_SET_ALBEDO_TEXTURE,
  ACTION_SET_ROUGHNESS,
  ACTION_SET_METALLIC
} from './MaterialActions'

export type MaterialAcceptedActions = ActionsUnion<typeof MaterialActions>
export interface MaterialState {
  activeMaterial: number
  materials: Material[]
}
export const materialInitialState: MaterialState = {
  activeMaterial: 0,
  materials: [
    {
      name: 'mat_01',
      albedoTexture: '',
      albedoColor: { r: 150, g: 150, b: 150 },
      roughness: 0.2,
      metallicTexture: '',
      metallic: 0.0
    }
  ]
}

export function materialReducer(
  state: MaterialState,
  action: MaterialAcceptedActions
) {
  switch (action.type) {
    case ACTION_SET_ALBEDO_COLOR:
      var updated = mapMaterialProps(state.materials, state.activeMaterial, {
        albedoColor: action.payload
      })
      return { ...state, materials: updated }

    case ACTION_SET_ALBEDO_TEXTURE:
      return state

    case ACTION_SET_ROUGHNESS:
      var updated = mapMaterialProps(state.materials, state.activeMaterial, {
        roughness: clamp(action.payload, 0, 1)
      })
      return { ...state, materials: updated }

    case ACTION_SET_METALLIC:
      var updated = mapMaterialProps(state.materials, state.activeMaterial, {
        metallic: clamp(action.payload, 0, 1)
      })
      return { ...state, materials: updated }

    default:
      throw new Error()
  }
}

// Clamp a number between a min and max value
const clamp = (val: number, min: number, max: number) => {
  return val < min ? min : val > max ? max : val
}

// Returns a material array with new props mapped in at the given index
const mapMaterialProps = (
  arr: Material[],
  index: number,
  props: Partial<Material>
) => {
  return arr.map((val, i) => (i === index ? { ...arr[index], ...props } : val))
}
