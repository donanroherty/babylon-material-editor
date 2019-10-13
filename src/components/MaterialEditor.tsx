import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { ChromePicker, ColorResult } from 'react-color'
import {
  MaterialState,
  MaterialAcceptedActions
} from 'state/material/materialReducer'
import {
  ACTION_SET_ROUGHNESS,
  ACTION_SET_METALLIC,
  ACTION_SET_ALBEDO_COLOR,
  ACTION_SET_METALLIC_TEXTURE,
  ACTION_SET_AO_TEXTURE,
  ACTION_SET_BUMP_TEXTURE
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
  const metallicFileInputRef = useRef<HTMLInputElement>(null)
  const bumpFileInputRef = useRef<HTMLInputElement>(null)
  const aoFileInputRef = useRef<HTMLInputElement>(null)
  const colorPickerRef = useRef<HTMLElement>(null)
  const [albedoColorPickerOpen, setAlbedoColorPickerOpen] = useState(false)

  const {
    albedoColor,
    roughness,
    metallic,
    metallicTexture,
    bumpTexture,
    aoTexture
  } = materialState.materials[materialState.activeMaterial]

  const hideAlbedoColorPicker = () => setAlbedoColorPickerOpen(false)

  useOutsideClick(colorPickerRef, hideAlbedoColorPicker)

  const handlAlbedoColorSwatchClick = () => {
    setAlbedoColorPickerOpen(true)
  }
  const handleAlbedoColorChange = (color: ColorResult) => {
    materialDispatch({ type: ACTION_SET_ALBEDO_COLOR, payload: color.rgb })
  }

  const handleRoughnessChange = (event: any) => {
    const val = event.target.value
    materialDispatch({ type: ACTION_SET_ROUGHNESS, payload: val })
  }
  const handleMetallicChange = (event: any) => {
    const val = event.target.value
    materialDispatch({ type: ACTION_SET_METALLIC, payload: val })
  }

  const handleOpenFileDialog = (name: string) => {
    if (name === 'metallic') {
      if (metallicFileInputRef.current) metallicFileInputRef.current.click()
    } else if (name === 'bump') {
      if (bumpFileInputRef.current)
        if (bumpFileInputRef.current) bumpFileInputRef.current.click()
    } else if (name === 'ao') {
      if (aoFileInputRef.current)
        if (aoFileInputRef.current) aoFileInputRef.current.click()
    }
  }

  const fileChangedHandler = (e: any) => {
    if (e.target.files.length === 0) return

    if (e.target.name === 'metallic') {
      materialDispatch({
        type: ACTION_SET_METALLIC_TEXTURE,
        payload: e.target.files[0].path
      })
    } else if (e.target.name === 'bump') {
      materialDispatch({
        type: ACTION_SET_BUMP_TEXTURE,
        payload: e.target.files[0].path
      })
    } else if (e.target.name === 'ao') {
      materialDispatch({
        type: ACTION_SET_AO_TEXTURE,
        payload: e.target.files[0].path
      })
    }

    // const reader = new FileReader()
    // reader.onloadend = () => {
    //   setFile(reader.result)
    // }
    // reader.readAsDataURL(file)
  }

  const handleClearFileDialog = (name: string) => {
    if (name === 'metallic') {
      if (metallicFileInputRef.current) metallicFileInputRef.current.value = ''
      materialDispatch({
        type: ACTION_SET_METALLIC_TEXTURE,
        payload: ''
      })
    } else if (name === 'bump') {
      if (bumpFileInputRef.current) bumpFileInputRef.current!.value = ''
      materialDispatch({
        type: ACTION_SET_METALLIC_TEXTURE,
        payload: ''
      })
    } else if (name === 'ao') {
      if (aoFileInputRef.current) aoFileInputRef.current!.value = ''
      materialDispatch({
        type: ACTION_SET_METALLIC_TEXTURE,
        payload: ''
      })
    }
  }

  return (
    <Wrapper data-testid="material-editor">
      <ShaderRow>
        <Label>
          <Text>Albedo color</Text>
        </Label>
        <ColorSwatch
          ref={colorPickerRef}
          onClick={handlAlbedoColorSwatchClick}
          color={albedoColor}
        >
          {albedoColorPickerOpen && (
            <StyledChromePicker
              color={albedoColor}
              onChangeComplete={handleAlbedoColorChange}
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
          value={roughness}
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
          value={metallic}
          onChange={handleMetallicChange}
          step={0.01}
        />
      </ShaderRow>

      <ShaderRow>
        <Label>
          <Text>Metallic texture</Text>
        </Label>
        <FilePath onClick={e => handleOpenFileDialog('metallic')}>
          {metallicTexture.length > 0 ? metallicTexture : 'none'}
        </FilePath>
        <ClearFilePathButton onClick={e => handleClearFileDialog('metallic')}>
          <Text>X</Text>
        </ClearFilePathButton>
        <input
          ref={metallicFileInputRef}
          type="file"
          accept="image/png, image/jpeg"
          name="metallic"
          style={{ position: 'fixed', top: '-100px' }}
          onChange={fileChangedHandler}
        />
      </ShaderRow>

      <ShaderRow>
        <Label>
          <Text>Bump texture</Text>
        </Label>
        <FilePath onClick={e => handleOpenFileDialog('bump')}>
          {bumpTexture.length > 0 ? bumpTexture : 'none'}
        </FilePath>
        <ClearFilePathButton onClick={e => handleClearFileDialog('bump')}>
          <Text>X</Text>
        </ClearFilePathButton>
        <input
          ref={bumpFileInputRef}
          type="file"
          accept="image/png, image/jpeg"
          name="bump"
          style={{ position: 'fixed', top: '-100px' }}
          onChange={fileChangedHandler}
        />
      </ShaderRow>

      <ShaderRow>
        <Label>
          <Text>AO texture</Text>
        </Label>
        <FilePath onClick={e => handleOpenFileDialog('ao')}>
          {aoTexture.length > 0 ? aoTexture : 'none'}
        </FilePath>
        <ClearFilePathButton onClick={e => handleClearFileDialog('ao')}>
          <Text>X</Text>
        </ClearFilePathButton>
        <input
          ref={aoFileInputRef}
          type="file"
          accept="image/png, image/jpeg"
          name="ao"
          style={{ position: 'fixed', top: '-100px' }}
          onChange={fileChangedHandler}
        />
      </ShaderRow>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  grid-area: material-property-editor;
  width: 100%;
  height: 100%;
  padding: 16px 28px;
  box-sizing: border-box;
`
const Label = styled.div`
  width: 120px;
  min-width: 120px;
`
const Text = styled.div`
  font-size: 14px;
  color: black;
`
const ShaderRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 36px;
  margin-bottom: 8px;
`
const Parameter = styled.input`
  font-size: 14px;
  color: black;
  text-align: center;
  width: 48px;
  height: 28px;
  border: 0;
  border: 1px solid #707070;
  border-radius: 5px;
  background-color: rgb(250, 250, 250);
`
const ColorSwatch = styled.div<any>`
  width: 48px;
  height: 28px;
  border: 0;
  border: 1px solid #707070;
  border-radius: 5px;
  background-color: ${({ color }) => `rgb(${Object.values(color)})`};
`
const StyledChromePicker = styled(ChromePicker)`
  position: relative;
  z-index: 2;
`
const FilePath = styled.div`
  height: 28px;
  width: 100%;
  border: 1px solid #707070;
  border-radius: 5px 0 0 5px;
  border-width: 1px 0 1px 1px;
  background-color: rgb(250, 250, 250);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  direction: rtl;
  text-align: left;
  box-sizing: border-box;
  padding: 2px 12px;
`
const ClearFilePathButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(220, 220, 220);
  border: 1px solid #707070;
  border-radius: 0 5px 5px 0;
  border-width: 1px 1px 1px 0;
  width: 50px;
  height: 28px;
  cursor: pointer;
  box-sizing: border-box;
`

export default MaterialEditor
