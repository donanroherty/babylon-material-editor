import * as BABYLON from 'babylonjs'
import { Vector3 } from 'babylonjs'
import ViewportEngine from './ViewportEngine'

export default class World {
  _main: ViewportEngine
  _engine: BABYLON.Engine
  _scene: BABYLON.Scene
  _canvas: HTMLCanvasElement

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
    this.createCamera(this._canvas, this._scene)
    this.createLighting(this._scene)
    this.createDisplayModel(this._scene)
    this.createGround(this._scene)

    // Render the scene
    this._main.renderScene(this._scene)
  }

  createCamera = (canvas: HTMLCanvasElement, sceneObj: BABYLON.Scene) => {
    const sphereRad = 2
    const camera = new BABYLON.FreeCamera(
      'camera_01',
      new Vector3(0, 2, -5),
      sceneObj
    )
    camera.setTarget(new Vector3(0, sphereRad * 0.5, 0))
    camera.attachControl(canvas, false)
    camera.inertia = 0.4
    camera.fov = ((90 * Math.PI) / 180) * 0.5
  }

  createLighting = (sceneObj: BABYLON.Scene) => {
    new BABYLON.HemisphericLight('light_env', new Vector3(0, 1, 0), sceneObj)
  }

  createDisplayModel = (sceneObj: BABYLON.Scene) => {
    const sphereRad = 2

    const sphere = BABYLON.Mesh.CreateSphere(
      'sphere_01',
      24,
      sphereRad,
      sceneObj,
      false,
      BABYLON.Mesh.FRONTSIDE
    )
    sphere.position.y = 1
  }

  createGround = (sceneObj: BABYLON.Scene) => {
    BABYLON.Mesh.CreateGround('ground_01', 6, 6, 2, sceneObj, false)
  }
}
