import {
  EllipsisHorizontalIcon,
  HomeIcon,
  InboxIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import { Link, Outlet } from "react-router-dom";
import { ProtectedRoute, Provider } from "~/components";

export function AccountLayout() {
  return (
    <Provider>
      <ProtectedRoute>
        {/* <header className="flex items-center justify-center p-2 border-b border-gray-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="25"
          width="25"
          viewBox="0 0 460 460"
        >
          <defs>
            <linearGradient id="logo_svg__logoGradient">
              <stop offset="0%" stop-color="#7fd298"></stop>
              <stop offset="50%" stop-color="#5fc77e"></stop>
              <stop offset="100%" stop-color="#39774c"></stop>
            </linearGradient>
            <style></style>
          </defs>
          <path
            id="logo_svg__Selection"
            fill="url('#logo_svg__logoGradient')"
            stroke="#5fc77e"
            stroke-width="1"
            d="M25 .15h152C197.98.03 209.97 12.02 210 33v144c-.03 21.55-12.83 32.97-34 33H34c-14.88-.02-27.33-6-32.25-21C.07 183.9.01 181.25 0 176V32C.19 15.75 8.96 4.04 25 .15Zm250 0h152C447.91.03 459.97 12.1 460 33v144c-.03 21.39-12.98 32.97-34 33H312c-26.1.04-54.12 9.74-72.96 28.09-5.52 5.37-10.5 12.29-14.44 18.91-8.91 14.99-14.57 38.57-14.6 56v116c-.24 20.41-14.64 30.97-34 31H32c-20.53-.25-31.97-14.17-32-34V284c.03-21.02 11.61-33.97 33-34h113c26.45-.04 53.1-8.63 73-26.29 4.94-4.39 10.32-11.17 14-16.71 5.09-7.68 8.98-16.16 11.58-25 3.2-10.92 5.4-22.6 5.42-34V34c.03-17.24 7.4-29.62 25-33.85Zm0 250h152c20.98-.12 32.97 11.87 33 32.85v144c-.03 21.41-12.95 32.97-34 33H284c-21.07-.03-33.97-12.93-34-34V282c.19-16.31 8.88-27.95 25-31.85Z"
          ></path>
        </svg>
      </header> */}
        <main className="flex flex-col flex-1 w-full h-full max-w-md mx-auto">
          <Outlet />
        </main>
        <footer className="relative z-30 p-2 bg-white border-t border-gray-300 select-none">
          <div className="w-full max-w-md mx-auto">
            <nav className="flex items-center justify-around text-center list-none">
              <li>
                <Link
                  to="/account"
                  className="flex flex-col items-center leading-tight outline-none group"
                >
                  <HomeIcon className="w-5 group-action:stroke-brand-500" />
                  <span className="text-xs group-action:text-brand-500">
                    Home
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/account/wallets"
                  className="flex flex-col items-center leading-tight outline-none group"
                >
                  <WalletIcon className="w-5 group-action:stroke-brand-500" />
                  <span className="text-xs group-action:text-brand-500">
                    Wallets
                  </span>
                </Link>
              </li>
              <li className="flex flex-col items-center leading-tight cursor-pointer group">
                <InboxIcon className="w-5 group-action:stroke-brand-500" />
                <span className="text-xs group-action:text-brand-500">
                  Contacts
                </span>
              </li>
              <li>
                <Link
                  to="/account/more"
                  className="flex flex-col items-center leading-tight outline-none group"
                >
                  <EllipsisHorizontalIcon className="w-5 group-action:stroke-brand-500" />
                  <span className="text-xs group-action:text-brand-500">
                    More
                  </span>
                </Link>
              </li>
            </nav>
          </div>
        </footer>
      </ProtectedRoute>
    </Provider>
  );
}
