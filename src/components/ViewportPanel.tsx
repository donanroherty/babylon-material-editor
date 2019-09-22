import React, { useRef, useCallback } from 'react'
import styled from 'styled-components'
import ViewportEngine from 'viewport/ViewportEngine'
import useResize from 'hooks/useResize'

export default function ViewportPanel() {
  const ref = useRef<HTMLDivElement>(null)
  const viewportEngineRef = useRef<ViewportEngine>()

  useResize(ref, () => {
    if (viewportEngineRef.current) viewportEngineRef.current.handleResize()
  })

  const canvasRef = useCallback((canvas: HTMLCanvasElement) => {
    viewportEngineRef.current = new ViewportEngine(canvas)
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
