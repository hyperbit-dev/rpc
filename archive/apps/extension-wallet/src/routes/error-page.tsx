import { ErrorResponse, useRouteError } from 'react-router-dom'
import Header from '../components/header'

export default function ErrorPage() {
  const error = useRouteError()

  const err = error as ErrorResponse & {
    message?: string
  }

  return (
    <>
      <Header />
      <div className="p-4">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p className="p-2 mt-2 bg-yellow-100 border border-yellow-200 rounded">
          <i>{err.statusText || err.message}</i>
        </p>
      </div>
    </>
  )
}
