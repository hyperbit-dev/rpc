import { Route, createMemoryRouter, createRoutesFromElements } from 'react-router-dom'
import Root from './root'
import ErrorPage from './error-page'
import SignPage, { action as signAction, loader as signLoader } from './sign'
import VerifyPage, { action as verifyAction, loader as verifyLoader } from './verify'
import { HomePage } from './home'
import { CreatePage } from './onboarding/create'

export const router = createMemoryRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
      // loader={rootLoader}
      // action={rootAction}
      errorElement={<ErrorPage />}
    >
      <Route errorElement={<ErrorPage />}>
        <Route index element={<HomePage />} />
        <Route path="sign" element={<SignPage />} loader={signLoader} action={signAction} />
        <Route path="verify" element={<VerifyPage />} loader={verifyLoader} action={verifyAction} />
        <Route path="/onboarding/create" element={<CreatePage />} />
      </Route>
    </Route>,
  ),
)
