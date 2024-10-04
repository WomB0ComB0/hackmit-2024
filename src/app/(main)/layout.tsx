import Navigation from '@/components/Navigation'
import React from 'react'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navigation />
      <main className="flex-1 overflow-y-auto p-4">
        {children}
      </main>
    </>
  )
}

export default DashboardLayout
