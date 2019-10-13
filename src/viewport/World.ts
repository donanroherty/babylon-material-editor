import { Material } from 'types/types'
import { MaterialState } from './../state/material/materialReducer'
import * as BABYLON from 'babylonjs'
import { Vector3 } from 'babylonjs'
import PBRMaterial from './PBRMaterial'
import ViewportEngine from './ViewportEngine'

export default class World {
  private _viewportEngine: ViewportEngine
  private _engine: BABYLON.Engine
  private _scene: BABYLON.Scene
  private _canvas: HTMLCanvasElement

  private _keyLight: BABYLON.DirectionalLight | null = null
  private _camera: BABYLON.ArcRotateCamera
  private _displayModel: BABYLON.Mesh
  private _environment: BABYLON.Mesh | null = null
  private _environmentTexturePath: string =
    'C:\\Users\\Ronan\\Projects\\Apps\\babylon-material-editor\\public\\assets\\environment\\room.dds'
  private _modelHeight = 2

  private _environmentTextureInstance: BABYLON.CubeTexture
  private _metallicTextureInstance: BABYLON.Texture | null = null

  constructor(
    main: ViewportEngine,
    engine: BABYLON.Engine,
    canvas: HTMLCanvasElement
  ) {
    this._viewportEngine = main
    this._engine = engine
    this._canvas = canvas

    this._scene = new BABYLON.Scene(this._engine)

    // Create initial environment texture for skybox and materials
    this._environmentTextureInstance = BABYLON.CubeTexture.CreateFromPrefilteredData(
      this._environmentTexturePath,
      this._scene
    )

    // this._metallicTextureInstance = new BABYLON.Texture.crea

    // Populate scene
    this._camera = this.createCamera(this._canvas, this._scene)
    this._keyLight = this.createKeyLight(this._scene)
    this._environment = this.createEnvironment(this._scene)
    this._displayModel = this.createDisplayModel(this._scene)

    // Render the scene
    this._viewportEngine.renderScene(this._scene)
  }

  createCamera = (canvas: HTMLCanvasElement, scene: BABYLON.Scene) => {
    const camera = new BABYLON.ArcRotateCamera(
      'camera_01',
      -Math.PI / 2,
      Math.PI / 2,
      4,
      new Vector3(0, this._modelHeight / 2, 0),
      scene
    )

    camera.attachControl(canvas, false)
    camera.inertia = 0.9

    return camera
  }

  createEnvironment = (scene: BABYLON.Scene) => {
    scene.createDefaultEnvironment({
      createGround: false,
      createSkybox: false,
      cameraExposure: 1
      // skyboxTexture: this._environmentTexturePath
    })

    scene.imageProcessingConfiguration.exposure = 0.6
    scene.imageProcessingConfiguration.contrast = 1.6

    var skyBox = BABYLON.Mesh.CreateBox('hdrSkyBox', 1000.0, scene)
    var mat = new BABYLON.PBRMaterial('skybox', scene)
    mat.backFaceCulling = false
    mat.reflectionTexture = this._environmentTextureInstance.clone()
    mat.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE
    mat.microSurface = 1.0
    mat.disableLighting = true
    skyBox.material = mat
    skyBox.infiniteDistance = true

    return skyBox
  }

  createKeyLight = (scene: BABYLON.Scene) => {
    const keyLightPos = new Vector3(-2, 3, -1)
    const keyLight = new BABYLON.DirectionalLight(
      'key_light_01',
      Vector3.Zero().subtract(keyLightPos), // direction points at 0,0,0
      scene
    )
    keyLight.diffuse = new BABYLON.Color3(247, 235, 203)
    keyLight.intensity = 0.01

    return keyLight
  }

  createDisplayModel = (scene: BABYLON.Scene) => {
    const sphere = BABYLON.Mesh.CreateSphere(
      'sphere_01',
      24,
      this._modelHeight,
      scene,
      false,
      BABYLON.Mesh.FRONTSIDE
    )
    sphere.position.y = this._modelHeight / 2

    sphere.material = this.createMaterial(
      {
        name: 'mat_01',
        albedoTexture: '',
        albedoColor: { r: 150, g: 150, b: 150 },
        roughness: 0.2,
        metallicTexture: '',
        metallic: 0.0,
        bumpTexture: '',
        aoTexture: ''
      },
      scene
    )

    return sphere
  }

  createMaterial = (mat: Material, scene: BABYLON.Scene) => {
    const newMat = new PBRMaterial('mat_sphere', scene, {
      albedoColor: new BABYLON.Color3(
        mat.albedoColor.r / 255,
        mat.albedoColor.g / 255,
        mat.albedoColor.b / 255
      ),
      roughness: mat.roughness,
      metallic: mat.metallic
    })
    newMat.reflectionTexture = this._environmentTextureInstance.clone()

    if (mat.albedoTexture.length > 0)
      newMat.albedoTexture = new BABYLON.Texture(mat.albedoTexture, scene)

    if (mat.metallicTexture.length > 0)
      newMat.metallicTexture = new BABYLON.Texture(mat.metallicTexture, scene)

    if (mat.bumpTexture.length > 0)
      newMat.bumpTexture = new BABYLON.Texture(mat.bumpTexture, scene)

    if (mat.aoTexture.length > 0)
      newMat.ambientTexture = new BABYLON.Texture(mat.aoTexture, scene)

    newMat.useRoughnessFromMetallicTextureGreen = true
    newMat.useRoughnessFromMetallicTextureAlpha = false
    newMat.useMetallnessFromMetallicTextureBlue = true

    return newMat
  }

  setMaterial = (matState: MaterialState) => {
    this._displayModel.material = this.createMaterial(
      matState.materials[matState.activeMaterial],
      this._scene
    )
  }
}
