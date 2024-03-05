import clsx from 'clsx'
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <header className="flex items-center justify-between px-4 bg-white border-b border-gray-300">
      <img src="/icons/logo.svg" width="25" height="25" />
      <nav className="flex items-center justify-center pl-5 list-none">
        <li>
          <NavLink
            className={({ isActive }) =>
              clsx(
                'block p-2 border-b-2 border-transparent hover:border-green-500 focus:border-green-500 text-md',
                isActive && 'border-green-500',
              )
            }
            to="/"
          >
            Sign
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              clsx(
                'block p-2 border-b-2 border-transparent hover:border-green-500 focus:border-green-500 text-md',
                isActive && 'border-green-500',
              )
            }
            to="/verify"
          >
            Verify
          </NavLink>
        </li>
      </nav>
    </header>
  )
}

export default Header
