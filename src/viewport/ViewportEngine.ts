import * as BABYLON from 'babylonjs'
import World from './World'

export default class ViewportEngine {
  _engine: BABYLON.Engine
  _canvas: HTMLCanvasElement
  _scene: BABYLON.Scene | null
  _world: World

  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas
    this._scene = null

    // Create engine
    this._engine = new BABYLON.Engine(this._canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true
    })

    this._world = new World(this, this._engine, this._canvas)
  }

  handleResize = () => {
    this._engine.resize()
  }

  renderScene = (scene: BABYLON.Scene) => {
    this._scene = scene

    // Initiate render
    this._engine.runRenderLoop(() => {
      if (this._scene) {
        this._scene.render()
      } else {
        console.log('scene failed to create')
      }
    })
  }
}
