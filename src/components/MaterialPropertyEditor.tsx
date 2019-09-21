import React from 'react'
import styled from 'styled-components'

export default function MaterialPropertyEditor() {
  return (
    <Wrapper data-testid="material-property-editor">
      MaterialPropertyEditor
    </Wrapper>
  )
}

const Wrapper = styled.div`
  grid-area: material-property-editor;
  background-color: lightgreen;
  width: 100%;
  height: 100%;
`
