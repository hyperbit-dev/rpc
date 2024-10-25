import { createHashRouter, RouterProvider } from "react-router-dom";
import {
  AccountLayout,
  AccountPage,
  ErrorPage,
  OnboardingPage,
  HomePage,
  WalletsPage,
  MorePage,
  MoreSettingsPage,
  MoreSecurityPage,
  MoreToolsPage,
  MoreConnectionsPage,
  WalletLimitsPage,
  AccountSendPage,
  AccountSwapPage,
  AccountBuyPage,
  AccountReceivePage,
  WalletsAddPage,
  WalletPage,
  RegisterPage,
  AddressEditPage,
} from "./pages";
import { Provider } from "./components";

const router = createHashRouter([
  {
    path: "/",
    element: (
      <Provider>
        <HomePage />
      </Provider>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: (
      <Provider>
        <RegisterPage />
      </Provider>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "onboarding",
    element: (
      <Provider>
        <OnboardingPage />
      </Provider>
    ),
  },
  {
    path: "account",
    element: <AccountLayout />,
    children: [
      {
        index: true,
        element: <AccountPage />,
      },
      {
        path: "swap",
        element: <AccountSwapPage />,
      },
      {
        path: "buy",
        element: <AccountBuyPage />,
      },
      {
        path: "receive",
        element: <AccountReceivePage />,
      },
      {
        path: "send",
        element: <AccountSendPage />,
      },
      {
        path: "wallets",
        element: <WalletsPage />,
      },
      {
        path: "wallets/add",
        element: <WalletsAddPage />,
      },
      {
        path: "wallets/:id",
        element: <WalletPage />,
      },
      {
        path: "wallets/:walletId/addresses/:address/edit",
        element: <AddressEditPage />,
      },
      {
        path: "more",
        element: <MorePage />,
      },
      {
        path: "more/settings",
        element: <MoreSettingsPage />,
      },
      {
        path: "more/settings/wallet-limits",
        element: <WalletLimitsPage />,
      },
      {
        path: "more/security",
        element: <MoreSecurityPage />,
      },
      {
        path: "more/tools",
        element: <MoreToolsPage />,
      },
      {
        path: "more/connections",
        element: <MoreConnectionsPage />,
      },
    ],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
