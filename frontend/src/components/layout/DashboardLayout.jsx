// src/components/layout/DashboardLayout.jsx
import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  // Close sidebar on route change (mobile nav)
  useEffect(() => {
    const handle = setTimeout(() => {
      setSidebarOpen(false)
    }, 0)
    return () => clearTimeout(handle)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar onMenuClick={() => setSidebarOpen(o => !o)} />

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 top-16 bg-black/60 z-49 backdrop-blur-[2px] md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex pt-16">
        <Sidebar isOpen={sidebarOpen} />
        <main className="flex-1 ml-0 md:ml-[240px] p-8 min-h-[calc(100vh-64px)] overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
