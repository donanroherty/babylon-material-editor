export type Material = {
  name: string
  albedoTexture: string
  baseColor: { r: number; g: number; b: number; a?: number }
  roughnessTexture: string
  roughness: number
  metallicTexture: string
  metallic: number
}
