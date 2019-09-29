import React from 'react'
import styled, { createGlobalStyle } from 'theme/themed-styled-components'
import MaterialBrowser from 'components/MaterialBrowser'
import ViewportPanel from 'components/ViewportPanel'
import MaterialPropertyEditor from 'components/MaterialPropertyEditor'
import useAppState from 'state/StateProvider'
import { AppActions } from 'state/app/AppActions'

const App: React.FC = () => {
  const [state, dispatch] = useAppState().useAppReducer()

  setTimeout(() => {
    dispatch(AppActions.setMaterial(0))
  }, 2000)

  return (
    <Wrapper>
      <GlobalStyle />
      <MaterialBrowser />
      <ViewportPanel />
      <MaterialPropertyEditor />
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
}

  body > #root > div {
  height: 100vh;
}  
`
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: 360px 1fr;
  grid-template-areas:
    'material-browser viewport'
    'material-browser material-property-editor';
`

export default App
