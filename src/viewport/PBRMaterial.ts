import * as BABYLON from 'babylonjs'

export interface PBRMaterialDef {
  albedoColor?: BABYLON.Color3
  metallic?: number
  roughness?: number
  environmentTexturePath?: string
}

const defaultMaterial: PBRMaterialDef = {
  albedoColor: new BABYLON.Color3(0.5, 0.5, 0.5),
  metallic: 0,
  roughness: 1,
  environmentTexturePath: ''
}

export default class PBRMaterial extends BABYLON.PBRMaterial {
  private _environmentTexturePath: string = ''

  constructor(
    name: string,
    scene: BABYLON.Scene,
    materialDef: Partial<PBRMaterialDef>
  ) {
    super(name, scene)

    this.setMaterialData(materialDef, scene)
  }

  setMaterialData = (
    materialDef: Partial<PBRMaterialDef>,
    scene: BABYLON.Scene
  ) => {
    // Merge supplied partial material props with defaul values
    const mat = {
      ...defaultMaterial,
      ...materialDef
    }

    this.albedoColor = mat.albedoColor!
    this.metallic = mat.metallic!
    this.roughness = mat.roughness!
    this._environmentTexturePath = mat.environmentTexturePath!

    var hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData(
      this._environmentTexturePath,
      scene
    )
    hdrTexture.gammaSpace = false
    this.reflectionTexture = hdrTexture
  }
}
