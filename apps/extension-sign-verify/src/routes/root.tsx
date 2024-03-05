import { Outlet } from 'react-router-dom'
import Header from '../components/header'
import { Footer } from '../components/footer'

export default function Root() {
  return (
    <>
      <Header />
      <main className="flex-1 overflow-auto">
        {/* @ts-expect-error jsx */}
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
