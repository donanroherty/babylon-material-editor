import React from 'react'
import styled from 'styled-components'

export default function Viewport() {
  return <Wrapper data-testid="viewport">Viewport</Wrapper>
}

const Wrapper = styled.div`
  grid-area: viewport;
  background-color: lightskyblue;
  width: 100%;
  height: 100%;
`
