import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { ChromePicker, ColorResult } from 'react-color'
import {
  MaterialState,
  MaterialAcceptedActions
} from 'state/material/materialReducer'
import {
  ACTION_SET_ROUGHNESS,
  ACTION_SET_METALLIC,
  ACTION_SET_BASE_COLOR
} from 'state/material/MaterialActions'
import useOutsideClick from 'hooks/useOutsideClick'

interface Props {
  materialState: MaterialState
  materialDispatch: React.Dispatch<MaterialAcceptedActions>
}

const MaterialEditor: React.FC<Props> = ({
  materialState,
  materialDispatch
}) => {
  const colorPickerRef = useRef<HTMLElement>(null)
  const [baseColorPickerOpen, setBaseColorPickerOpen] = useState(false)

  const hideBaseColorPicker = () => setBaseColorPickerOpen(false)

  useOutsideClick(colorPickerRef, hideBaseColorPicker)

  const handlBaseColorSwatchClick = () => {
    setBaseColorPickerOpen(true)
  }
  const handleBaseColorChange = (color: ColorResult) => {
    materialDispatch({ type: ACTION_SET_BASE_COLOR, payload: color.rgb })
  }

  const handleRoughnessChange = (event: any) => {
    const val = event.target.value
    materialDispatch({ type: ACTION_SET_ROUGHNESS, payload: val })
  }
  const handleMetallicChange = (event: any) => {
    const val = event.target.value
    materialDispatch({ type: ACTION_SET_METALLIC, payload: val })
  }

  return (
    <Wrapper data-testid="material-editor">
      <ShaderRow>
        <Label>
          <Text>Albedo</Text>
        </Label>
        <ColorSwatch
          ref={colorPickerRef}
          onClick={handlBaseColorSwatchClick}
          color={materialState.baseColor}
        >
          {baseColorPickerOpen && (
            <StyledChromePicker
              color={materialState.baseColor}
              onChangeComplete={handleBaseColorChange}
              disableAlpha
            />
          )}
        </ColorSwatch>
      </ShaderRow>

      <ShaderRow>
        <Label>
          <Text>Roughness</Text>
        </Label>
        <Parameter
          type="number"
          value={materialState.roughness}
          onChange={handleRoughnessChange}
          step={0.01}
        />
      </ShaderRow>

      <ShaderRow>
        <Label>
          <Text>Metallic</Text>
        </Label>
        <Parameter
          type="number"
          value={materialState.metallic}
          onChange={handleMetallicChange}
          step={0.01}
        />
      </ShaderRow>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  grid-area: material-property-editor;
  width: 100%;
  height: 100%;
`
const Label = styled.div`
  width: 100px;
`
const Text = styled.div`
  font-size: 18px;
  color: black;
`
const ShaderRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 36px;
  padding: 10px 17px;
`
const Parameter = styled.input`
  font-size: 16px;
  color: black;
  text-align: center;
  width: 48px;
  height: 36px;
  border: 0;
  border: 1px solid #707070;
  border-radius: 5px;
`
const ColorSwatch = styled.div<any>`
  width: 48px;
  height: 36px;
  border: 0;
  border: 1px solid #707070;
  border-radius: 5px;
  background-color: ${({ color }) => {
    return `rgb(${color.r},${color.g},${color.b})`
  }};
`
const StyledChromePicker = styled(ChromePicker)`
  position: relative;
  z-index: 2;
`

export default MaterialEditor
