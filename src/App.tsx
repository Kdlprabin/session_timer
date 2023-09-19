import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import Providers from './providers'
import { Suspense } from 'react'

function App() {
  return (
    <Providers>
      <Suspense>
        <RouterProvider router={router} />
      </Suspense>
    </Providers>
  )
}

export default App
