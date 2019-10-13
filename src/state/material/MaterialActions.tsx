import { createActionPayload } from 'state/ActionCreator'

export const ACTION_SET_ALBEDO_COLOR = 'ACTION_SET_ALBEDO_COLOR'
export const ACTION_SET_ALBEDO_TEXTURE = 'ACTION_SET_ALBEDO_TEXTURE'
export const ACTION_SET_ROUGHNESS = 'ACTION_SET_ROUGHNESS'
export const ACTION_SET_METALLIC = 'ACTION_SET_METALLIC'
export const ACTION_SET_METALLIC_TEXTURE = 'ACTION_SET_METALLIC_TEXTURE'
export const ACTION_SET_BUMP_TEXTURE = 'ACTION_SET_BUMP_TEXTURE'
export const ACTION_SET_AO_TEXTURE = 'ACTION_SET_AO_TEXTURE'

export const MaterialActions = {
  setAlbedoColor: createActionPayload<
    typeof ACTION_SET_ALBEDO_COLOR,
    { r: number; g: number; b: number; a?: number }
  >(ACTION_SET_ALBEDO_COLOR),

  setAlbedoTexture: createActionPayload<
    typeof ACTION_SET_ALBEDO_TEXTURE,
    string
  >(ACTION_SET_ALBEDO_TEXTURE),

  setRoughnessValue: createActionPayload<typeof ACTION_SET_ROUGHNESS, number>(
    ACTION_SET_ROUGHNESS
  ),

  setMetallicValue: createActionPayload<typeof ACTION_SET_METALLIC, number>(
    ACTION_SET_METALLIC
  ),

  setMetallicTexture: createActionPayload<
    typeof ACTION_SET_METALLIC_TEXTURE,
    string
  >(ACTION_SET_METALLIC_TEXTURE),

  setBumpTexture: createActionPayload<typeof ACTION_SET_BUMP_TEXTURE, string>(
    ACTION_SET_BUMP_TEXTURE
  ),

  setAOTexture: createActionPayload<typeof ACTION_SET_AO_TEXTURE, string>(
    ACTION_SET_AO_TEXTURE
  )
}
