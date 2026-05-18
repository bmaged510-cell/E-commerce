import React from 'react'
import { GridLoader } from 'react-spinners'

export default function Loading() {
  return (
    <div className="h-screen flex items-center justify-center">
      <GridLoader />
    </div>
  )
}