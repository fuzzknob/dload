import React from 'react'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="w-screen h-screen bg-primary dark:bg-primary-dark overflow-y-auto pb-12">
      <div className="w-9/12 m-auto pt-20">{children}</div>
    </div>
  )
}

export default MainLayout
