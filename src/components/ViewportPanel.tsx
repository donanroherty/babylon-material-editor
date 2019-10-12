import React, { useRef, useCallback, useEffect } from 'react'
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
  const viewportEngineRef = useRef<ViewportEngine>()

  const resize = () => {
    if (viewportEngineRef.current) viewportEngineRef.current.handleResize()
  }
  useResize(ref, () => {
    resize()
  })

  const updateMaterial = () => {
    const mat: Material = {
      name: materialState.name,
      albedoTexture: materialState.albedoTexture,
      baseColor: materialState.baseColor,
      roughnessTexture: materialState.roughnessTexture,
      roughness: materialState.roughness,
      metallicTexture: materialState.metallicTexture,
      metallic: materialState.metallic
    }

    if (viewportEngineRef.current) viewportEngineRef.current.setMaterial(mat)
  }

  updateMaterial()

  const canvasRef = useCallback((canvas: HTMLCanvasElement) => {
    viewportEngineRef.current = new ViewportEngine(canvas)
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
