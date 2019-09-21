import React from 'react'
import App from '../App'
import { render } from '@testing-library/react'

it('<App/> renders', () => {
  expect(render(<App />)).toBeTruthy()
})

test('<MaterialBrowser/> renders', () => {
  const { queryByTestId } = render(<App />)
  expect(queryByTestId('material-browser')).not.toBeNull()
})

test('<Viewport/> renders', () => {
  const { queryByTestId } = render(<App />)
  expect(queryByTestId('viewport')).not.toBeNull()
})

test('<MaterialPropertyEditor/> renders', () => {
  const { queryByTestId } = render(<App />)
  expect(queryByTestId('material-property-editor')).not.toBeNull()
})
