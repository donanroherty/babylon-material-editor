import React, { useReducer } from 'react'
import styled, { createGlobalStyle } from 'theme/themed-styled-components'
import MaterialBrowser from 'components/MaterialBrowser'
import ViewportPanel from 'components/ViewportPanel'
import MaterialEditor from 'components/MaterialEditor'

import {
  materialReducer,
  MaterialState,
  materialInitialState
} from 'state/material/materialReducer'

const App: React.FC = () => {
  const [materialState, materialDispatch] = useReducer(
    materialReducer,
    materialInitialState
  )

  return (
    <Wrapper>
      <GlobalStyle />
      {/* <LeftColumn>
        <MaterialBrowser />
      </LeftColumn> */}
      <RightColumn>
        <ViewportPanel materialState={materialState} />
        <MaterialEditor
          materialState={materialState}
          materialDispatch={materialDispatch}
        />
      </RightColumn>
    </Wrapper>
  )
}

const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  user-select: none;
}

  body > #root > div {
  height: 100vh;
}  
`
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  /* display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: 360px 1fr;
  grid-template-areas:
    'material-browser viewport'
    'material-browser material-property-editor'; */
  display: flex;
  flex-direction: row;
`
const LeftColumn = styled.div`
  width: 240px;
  height: 100%;
`
const RightColumn = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: content-box;
`

export default App
