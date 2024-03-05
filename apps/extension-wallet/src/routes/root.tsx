import { Outlet } from 'react-router-dom'

export default function Root() {
  return (
    <main className="flex flex-col h-full border border-gray-300">
      <Outlet />
    </main>
  )
}
