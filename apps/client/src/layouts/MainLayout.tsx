import React from 'react'
import { Container } from '@mantine/core'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Container
      style={{
        paddingTop: '80px',
        paddingBottom: '80px',
      }}
      size="xl"
    >
      {children}
    </Container>
  )
}

export default MainLayout
