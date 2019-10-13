import { createActionPayload } from 'state/ActionCreator'

export const ACTION_SET_BASE_COLOR = 'ACTION_SET_BASE_COLOR'
export const ACTION_SET_ALBEDO_TEXTURE = 'ACTION_SET_ALBEDO_TEXTURE'
export const ACTION_SET_ROUGHNESS = 'ACTION_SET_ROUGHNESS'
export const ACTION_SET_METALLIC = 'ACTION_SET_METALLIC'

export const MaterialActions = {
  setAlbedoColor: createActionPayload<
    typeof ACTION_SET_BASE_COLOR,
    { r: number; g: number; b: number; a?: number }
  >(ACTION_SET_BASE_COLOR),

  setAlbedoTexture: createActionPayload<
    typeof ACTION_SET_ALBEDO_TEXTURE,
    string
  >(ACTION_SET_ALBEDO_TEXTURE),

  setRoughnessValue: createActionPayload<typeof ACTION_SET_ROUGHNESS, number>(
    ACTION_SET_ROUGHNESS
  ),

  setMetallicValue: createActionPayload<typeof ACTION_SET_METALLIC, number>(
    ACTION_SET_METALLIC
  )
}
