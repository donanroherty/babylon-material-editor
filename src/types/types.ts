export type Material = {
  name: string
  albedoTexture: string
  albedoColor: { r: number; g: number; b: number; a?: number }
  roughness: number
  metallicTexture: string
  metallic: number
}
