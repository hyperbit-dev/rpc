import React from 'react'
import ReactDOM from 'react-dom/client'
import { router } from '../routes/router'
import { RouterProvider } from 'react-router-dom'
import '../global.css'

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    {/* @ts-expect-error jsx */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)
