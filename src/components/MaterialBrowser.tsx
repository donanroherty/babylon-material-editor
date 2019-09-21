import React from 'react'
import styled from 'styled-components'

export default function MaterialBrowser() {
  return <Wrapper data-testid="material-browser">MaterialBrowser</Wrapper>
}

const Wrapper = styled.div`
  grid-area: material-browser;
  background-color: lightcoral;
  width: 100%;
  height: 100%;
`
