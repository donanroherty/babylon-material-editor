import * as BABYLON from 'babylonjs'
import { Vector3 } from 'babylonjs'
import PBRMaterial from './PBRMaterial'
import ViewportEngine from './ViewportEngine'

export default class World {
  private _viewportEngine: ViewportEngine
  private _engine: BABYLON.Engine
  private _scene: BABYLON.Scene
  private _canvas: HTMLCanvasElement

  private _keyLight: BABYLON.DirectionalLight | null
  private _camera: BABYLON.ArcRotateCamera
  private _displayModel: BABYLON.Mesh
  private _environment: BABYLON.EnvironmentHelper | null

  private _modelHeight = 2

  constructor(
    main: ViewportEngine,
    engine: BABYLON.Engine,
    canvas: HTMLCanvasElement
  ) {
    this._viewportEngine = main
    this._engine = engine
    this._canvas = canvas

    // Create scene
    this._scene = new BABYLON.Scene(this._engine)

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
    return scene.createDefaultEnvironment({
      createGround: false,
      createSkybox: true,
      cameraExposure: 1.6,
      skyboxTexture: 'assets/environment/Runyon_Canyon_A_2k_cube_specular.dds'
    })
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

    const mat = new PBRMaterial('mat_sphere', scene, {
      roughness: 0.1,
      metallic: 1
    })
    sphere.material = mat

    return sphere
  }
}
