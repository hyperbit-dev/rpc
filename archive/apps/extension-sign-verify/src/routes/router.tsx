import { Route, createMemoryRouter, createRoutesFromElements } from 'react-router-dom'
import Root from './root'
import ErrorPage from './error-page'
import SignPage, { action as signAction, loader as signLoader } from './sign'
import VerifyPage, { action as verifyAction, loader as verifyLoader } from './verify'

export const router = createMemoryRouter(
  createRoutesFromElements(
    // @ts-expect-error jsx
    <Route
      path="/"
      element={<Root />}
      // loader={rootLoader}
      // action={rootAction}
      errorElement={<ErrorPage />}
    >
      {/* @ts-expect-error jsx */}
      <Route errorElement={<ErrorPage />}>
        {/* @ts-expect-error jsx */}
        <Route index element={<SignPage />} loader={signLoader} action={signAction} />
        {/* @ts-expect-error jsx */}
        <Route index path="sign" element={<SignPage />} loader={signLoader} action={signAction} />
        {/* @ts-expect-error jsx */}
        <Route path="verify" element={<VerifyPage />} loader={verifyLoader} action={verifyAction} />
      </Route>
    </Route>,
  ),
)
