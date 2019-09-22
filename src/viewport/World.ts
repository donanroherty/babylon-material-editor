import * as BABYLON from 'babylonjs'
import { Vector3 } from 'babylonjs'
import PBRMaterial from './PBRMaterial'
import ViewportEngine from './ViewportEngine'

export default class World {
  private _main: ViewportEngine
  private _engine: BABYLON.Engine
  private _scene: BABYLON.Scene
  private _canvas: HTMLCanvasElement

  constructor(
    main: ViewportEngine,
    engine: BABYLON.Engine,
    canvas: HTMLCanvasElement
  ) {
    this._main = main
    this._engine = engine
    this._canvas = canvas

    // Create scene
    this._scene = new BABYLON.Scene(this._engine)

    // Populate scene
    this.createEnvironment(this._scene)
    this.createCamera(this._canvas, this._scene)
    this.createLighting(this._scene)
    this.createDisplayModel(this._scene)
    // this.createGround(this._scene)

    // Render the scene
    this._main.renderScene(this._scene)
  }

  createCamera = (canvas: HTMLCanvasElement, scene: BABYLON.Scene) => {
    const modelHeight = 2

    const camera = new BABYLON.ArcRotateCamera(
      'camera_01',
      0,
      Math.PI / 2,
      4,
      BABYLON.Vector3.Zero(),
      scene
    )
    camera.setTarget(new Vector3(0, modelHeight * 0.5, 0))
    camera.attachControl(canvas, false)
    camera.inertia = 0.4
    camera.fov = ((90 * Math.PI) / 180) * 0.5
  }

  createLighting = (scene: BABYLON.Scene) => {
    new BABYLON.HemisphericLight('light_env', new Vector3(0, 1, 0), scene)
  }

  createEnvironment = (scene: BABYLON.Scene) => {
    const hdr: BABYLON.CubeTexture = BABYLON.CubeTexture.CreateFromPrefilteredData(
      'assets/environment/environment.dds',
      scene
    )
    hdr.gammaSpace = false
    // scene.createDefaultSkybox(hdr, true, 0.5, 0, true)
    scene.createDefaultEnvironment({
      createGround: false,
      createSkybox: true,
      skyboxTexture: 'assets/environment/environment.dds'
    })
    // scene.environmentTexture = hdr
  }

  createDisplayModel = (scene: BABYLON.Scene) => {
    const sphereRad = 2
    const sphere = BABYLON.Mesh.CreateSphere(
      'sphere_01',
      24,
      sphereRad,
      scene,
      false,
      BABYLON.Mesh.FRONTSIDE
    )
    sphere.position.y = 1

    const mat = new PBRMaterial('mat_sphere', scene, { roughness: 0 })
    sphere.material = mat
  }

  createGround = (scene: BABYLON.Scene) => {
    const ground = BABYLON.Mesh.CreateGround('ground_01', 6, 6, 2, scene, false)
  }
}
