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
  AccountBackupPage,
  AccountBuyPage,
  AccountReceivePage,
  WalletsAddPage,
  WalletPage,
} from "./pages";
import { Provider } from "./components";

const router = createHashRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "onboarding",
    element: <OnboardingPage />,
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
        path: "backup",
        element: <AccountBackupPage />,
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
  return (
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default Router;
