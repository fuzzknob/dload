import React from 'react'
import styled from 'styled-components'

const ProgressContainer = styled.div`
  height: 8px;
`
const Progress = styled.div`
  width: ${(props: { width: number }) => props.width}%;
`

interface ProgressBarProps {
  progress: number
  color?: string
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <ProgressContainer className="flex w-full h-2 bg-tertiary rounded">
      <Progress
        className="bg-blue h-full rounded transition-width"
        width={progress}
      />
    </ProgressContainer>
  )
}

export default ProgressBar
