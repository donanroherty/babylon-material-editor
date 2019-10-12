import React, { useRef, useState } from 'react'
import styled from 'styled-components'

interface Props {
  label: string
  texturePath: string
  value: number
  parameterType: 'number' | 'rgb'
}

const MaterialTextureField: React.FC<Props> = ({
  texturePath,
  label,
  value
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [filePath, setFilePath] = useState<string | null>(null)
  const [file, setFile] = useState<string | ArrayBuffer | null>(null)
  const [parameter, setParameter] = useState(1)

  const fileChangedHandler = (e: any) => {
    if (e.target.files.length === 0) return

    const file = e.target.files[0]

    setFilePath(file.path)

    const reader = new FileReader()
    reader.onloadend = () => {
      setFile(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleOpenFileDialog = () => {
    if (fileInputRef.current) fileInputRef.current.click()
  }

  const handleClearFileDialog = () => {
    setFile(null)
    setFilePath(null)
    fileInputRef.current!.value = ''
  }

  const handleParameterChange = (e: any) => {
    setParameter(e.target.value)
  }

  return (
    <Wrapper>
      <Controls>
        <Label>
          <Text>{label}</Text>
        </Label>
        <Parameter
          type="number"
          value={value}
          onChange={handleParameterChange}
          step={0.1}
        />
        <PathWrapper>
          <TexturePath onClick={handleOpenFileDialog}>
            <Text>{texturePath}</Text>
          </TexturePath>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg"
            name="albedo"
            style={{ position: 'fixed', top: '-100px' }}
            onChange={fileChangedHandler}
          />
          <ClearFilePathButton onClick={handleClearFileDialog}>
            <Text>Clear</Text>
          </ClearFilePathButton>
        </PathWrapper>
      </Controls>
    </Wrapper>
  )
}

const Wrapper = styled.div``
const Controls = styled.div`
  display: grid;
  grid-template-columns: 75px auto 1fr;
  grid-gap: 18px;
  align-items: center;
  height: 36px;
  padding: 0 17px;
`
const Text = styled.div`
  font-size: 18px;
  color: #707070;
`
const Label = styled.div`
  width: 100%;
`
const ColorControl = styled.div`
  width: 100%;
  height: 100%;
`
const Parameter = styled.input`
  font-size: 16px;
  color: #707070;
  text-align: center;
  width: 48px;
  height: 36px;
  border: 0;
  border: 1px solid #707070;
  border-radius: 5px;
`
const PathWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  padding-left: 15px;
  border: 1px solid #707070;
  border-radius: 5px;
  justify-content: space-between;
  box-sizing: border-box;
`
const TexturePath = styled.div`
  width: 100%;
  cursor: pointer;
`
const ClearFilePathButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: lightblue;
  width: 50px;
  height: 100%;
  cursor: pointer;
  user-select: none;
`

export default MaterialTextureField
