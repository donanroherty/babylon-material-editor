import * as BABYLON from 'babylonjs'

export interface PBRMaterialDef {
  baseColor?: [number, number, number]
  metallic?: number
  roughness?: number
}

const defaultMaterial: PBRMaterialDef = {
  baseColor: [0.5, 0.5, 0.5],
  metallic: 0,
  roughness: 1
}

export default class PBRMaterial extends BABYLON.PBRMetallicRoughnessMaterial {
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

    this.baseColor = new BABYLON.Color3(...mat.baseColor!)
    this.metallic = mat.metallic!
    this.roughness = mat.roughness!

    this.environmentTexture = BABYLON.CubeTexture.CreateFromPrefilteredData(
      'assets/environment/Runyon_Canyon_A_2k_cube_specular.dds',
      scene
    )

    // var hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData(
    //   'assets/environment/room.dds',
    //   scene
    // )
    // hdrTexture.gammaSpace = false
    // this.environmentTexture = hdrTexture
  }
}
