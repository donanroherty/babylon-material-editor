import React, { useRef, useCallback } from 'react'
import styled from 'styled-components'
import ViewportEngine from 'viewport/ViewportEngine'
import useResize from 'hooks/useResize'
import { MaterialState } from 'state/material/materialReducer'
import { Material } from 'types/types'

interface Props {
  materialState: MaterialState
}

const ViewportPanel: React.FC<Props> = ({ materialState }) => {
  const ref = useRef<HTMLDivElement>(null)
  const babylonEngineRef = useRef<ViewportEngine>()

  const material = materialState.materials[materialState.activeMaterial]

  const resize = () => {
    if (babylonEngineRef.current) babylonEngineRef.current.handleResize()
  }
  useResize(ref, () => {
    resize()
  })

  const updateMaterial = () => {
    if (babylonEngineRef.current) babylonEngineRef.current.setMaterial(material)
  }

  updateMaterial()

  const canvasRef = useCallback((canvas: HTMLCanvasElement) => {
    babylonEngineRef.current = new ViewportEngine(canvas)
    updateMaterial() // Initialize material
    resize()
  }, [])

  return (
    <Wrapper data-testid="viewport-panel" ref={ref}>
      <Canvas ref={canvasRef} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  grid-area: viewport;
  background-color: lightskyblue;
  width: 100%;
  height: 100%;
`
const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`

export default React.memo(ViewportPanel)
