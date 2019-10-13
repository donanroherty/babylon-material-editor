import { ActionsUnion } from 'state/ActionCreator'
import { Material } from 'types/types'
import {
  MaterialActions,
  ACTION_SET_ALBEDO_COLOR,
  ACTION_SET_ALBEDO_TEXTURE,
  ACTION_SET_ROUGHNESS,
  ACTION_SET_METALLIC,
  ACTION_SET_METALLIC_TEXTURE,
  ACTION_SET_BUMP_TEXTURE,
  ACTION_SET_AO_TEXTURE
} from './MaterialActions'

export type MaterialAcceptedActions = ActionsUnion<typeof MaterialActions>
export interface MaterialState {
  activeMaterial: number
  texturesBasePath: string
  materials: Material[]
}
export const materialInitialState: MaterialState = {
  activeMaterial: 0,
  texturesBasePath:
    'C:\\Users\\Ronan\\Projects\\Apps\\babylon-material-editor\\pbr-materials\\',
  materials: [
    {
      name: 'mat_01',

      albedoColor: { r: 255, g: 255, b: 255 },
      roughness: 1,
      metallic: 1.0,
      albedoTexture:
        'C:\\Users\\Ronan\\Projects\\Apps\\babylon-material-editor\\pbr-materials\\chipped-paint-metal\\chipped-paint-metal-albedo.png',
      metallicTexture:
        'C:\\Users\\Ronan\\Projects\\Apps\\babylon-material-editor\\pbr-materials\\chipped-paint-metal\\chipped-paint-metal-mr.png',
      bumpTexture:
        'C:\\Users\\Ronan\\Projects\\Apps\\babylon-material-editor\\pbr-materials\\chipped-paint-metal\\chipped-paint-metal-normal-dx.png',
      aoTexture:
        'C:\\Users\\Ronan\\Projects\\Apps\\babylon-material-editor\\pbr-materials\\chipped-paint-metal\\chipped-paint-ao.png'
    }
  ]
}

export function materialReducer(
  state: MaterialState,
  action: MaterialAcceptedActions
) {
  switch (action.type) {
    case ACTION_SET_ALBEDO_COLOR:
      return {
        ...state,
        materials: mapMaterialProps(state.materials, state.activeMaterial, {
          albedoColor: action.payload
        })
      }

    case ACTION_SET_ALBEDO_TEXTURE:
      return state

    case ACTION_SET_ROUGHNESS:
      return {
        ...state,
        materials: mapMaterialProps(state.materials, state.activeMaterial, {
          roughness: clamp(action.payload, 0, 1)
        })
      }

    case ACTION_SET_METALLIC:
      return {
        ...state,
        materials: mapMaterialProps(state.materials, state.activeMaterial, {
          metallic: clamp(action.payload, 0, 1)
        })
      }

    case ACTION_SET_METALLIC_TEXTURE:
      return {
        ...state,
        materials: mapMaterialProps(state.materials, state.activeMaterial, {
          metallicTexture: action.payload
        })
      }

    case ACTION_SET_BUMP_TEXTURE:
      return {
        ...state,
        materials: mapMaterialProps(state.materials, state.activeMaterial, {
          bumpTexture: action.payload
        })
      }

    case ACTION_SET_AO_TEXTURE:
      return {
        ...state,
        materials: mapMaterialProps(state.materials, state.activeMaterial, {
          aoTexture: action.payload
        })
      }

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
