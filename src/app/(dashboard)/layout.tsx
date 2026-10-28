'use client'

import React from 'react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#0b0e14] text-white flex flex-col">
      {children}
    </div>
  )
}
