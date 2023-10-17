import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export function AppSidebar() {
  const { data, status } = useSession();

  return (
    <div
      className="relative flex flex-col h-full"
      style={{
        width: "175px",
        background: "#1d212f",
      }}
    >
      <div className="relative z-30 flex items-center gap-2 p-4 text-lg font-semibold text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="25"
          width="25"
          viewBox="0 0 460 460"
        >
          <defs>
            <linearGradient id="logo_svg__logoGradient">
              <stop
                className="logo_svg__stop1"
                offset="0%"
                stopColor="#7fd298"
              ></stop>
              <stop offset="50%" stopColor="#5fc77e"></stop>
              <stop offset="100%" stopColor="#39774c"></stop>
            </linearGradient>
            <style></style>
          </defs>
          <path
            id="logo_svg__Selection"
            fill="url('#logo_svg__logoGradient')"
            stroke="#EDB40D"
            strokeWidth="1"
            d="M25 .15h152C197.98.03 209.97 12.02 210 33v144c-.03 21.55-12.83 32.97-34 33H34c-14.88-.02-27.33-6-32.25-21C.07 183.9.01 181.25 0 176V32C.19 15.75 8.96 4.04 25 .15Zm250 0h152C447.91.03 459.97 12.1 460 33v144c-.03 21.39-12.98 32.97-34 33H312c-26.1.04-54.12 9.74-72.96 28.09-5.52 5.37-10.5 12.29-14.44 18.91-8.91 14.99-14.57 38.57-14.6 56v116c-.24 20.41-14.64 30.97-34 31H32c-20.53-.25-31.97-14.17-32-34V284c.03-21.02 11.61-33.97 33-34h113c26.45-.04 53.1-8.63 73-26.29 4.94-4.39 10.32-11.17 14-16.71 5.09-7.68 8.98-16.16 11.58-25 3.2-10.92 5.4-22.6 5.42-34V34c.03-17.24 7.4-29.62 25-33.85Zm0 250h152c20.98-.12 32.97 11.87 33 32.85v144c-.03 21.41-12.95 32.97-34 33H284c-21.07-.03-33.97-12.93-34-34V282c.19-16.31 8.88-27.95 25-31.85Z"
          ></path>
        </svg>
        <span className="uppercase">Hyperbit</span>
      </div>
      <nav className="relative z-30 flex flex-col justify-center flex-1 gap-2 p-0 m-0 text-sm font-medium text-gray-300 list-none">
        <li>
          <Link
            href="/account"
            className="flex items-center justify-between block px-4 py-3 mx-4 duration-300 rounded-lg hover:text-white focus:text-white active:text-white hover:bg-brand-500 active:bg-brand-500 focus:bg-brand-500"
          >
            <span>Dashboard</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M9 6L15 12L9 18"
                stroke="#ffffff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Link>
        </li>
        <li>
          <Link
            href="/account/wallets"
            className="flex items-center justify-between block px-4 py-3 mx-4 duration-300 rounded-lg hover:text-white focus:text-white active:text-white hover:bg-brand-500 active:bg-brand-500 focus:bg-brand-500"
          >
            <span>Wallets</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M9 6L15 12L9 18"
                stroke="#ffffff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Link>
        </li>

        <li>
          <Link
            href="/account/settings"
            className="flex items-center justify-between block px-4 py-3 mx-4 duration-300 rounded-lg hover:text-white focus:text-white active:text-white hover:bg-brand-500 active:bg-brand-500 focus:bg-brand-500"
          >
            <span>Settings</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M9 6L15 12L9 18"
                stroke="#ffffff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Link>
        </li>
      </nav>
      <div className="relative z-30 flex flex-row items-center justify-center gap-2 p-4">
        <div className="p-1 mx-auto border border-gray-300 rounded-full">
          <svg
            className="w-6 h-6 rounded"
            viewBox="0 0 420.000000 451.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,451.000000) scale(0.100000,-0.100000)"
              className="fill-white"
              stroke="none"
            >
              <path d="M1472 4489 c-72 -36 -138 -134 -188 -283 -13 -37 -47 -179 -74 -315 -28 -135 -65 -308 -81 -384 -16 -76 -29 -144 -29 -153 0 -32 276 -135 465 -173 190 -38 276 -46 520 -46 244 0 330 8 520 46 159 32 425 125 425 148 0 16 -161 779 -177 836 -44 166 -143 310 -230 335 -66 20 -108 6 -162 -51 -119 -129 -146 -152 -205 -180 -129 -61 -267 -60 -391 1 -65 32 -104 65 -179 154 -74 87 -133 105 -214 65z" />
              <path d="M860 3054 c-277 -85 -427 -181 -461 -293 -88 -295 862 -546 1896 -501 943 41 1565 281 1411 544 -57 97 -233 193 -477 260 l-88 24 -81 -34 c-287 -120 -597 -177 -975 -177 -379 0 -688 56 -977 178 -45 19 -94 35 -108 35 -14 -1 -77 -17 -140 -36z" />
              <path d="M3680 2439 c-41 -34 -157 -89 -280 -133 l-115 -41 -5 -205 c-3 -134 -9 -212 -17 -226 -7 -12 -67 -50 -133 -84 -417 -216 -752 -495 -1031 -858 -182 -238 -358 -574 -433 -832 -18 -62 -22 -65 76 55 84 101 297 310 408 398 307 245 693 448 1099 581 142 47 408 116 445 116 12 0 26 4 33 8 7 4 -86 27 -205 51 -119 24 -221 47 -225 51 -5 4 189 130 430 280 241 150 446 278 455 285 15 10 -12 46 -219 293 -129 155 -240 282 -246 282 -7 -1 -23 -10 -37 -21z" />
              <path d="M274 2193 c-109 -119 -215 -235 -235 -257 l-36 -41 453 -255 c249 -140 454 -257 454 -260 0 -3 -92 -43 -205 -90 -113 -46 -205 -87 -205 -90 0 -3 278 -145 618 -317 l618 -312 28 52 c16 29 52 87 79 130 l50 79 -34 26 c-229 179 -512 466 -673 685 -159 216 -283 471 -326 672 l-11 50 -103 33 c-56 18 -138 51 -182 72 -43 22 -82 39 -85 40 -3 0 -95 -98 -205 -217z" />
              <path d="M2960 2195 c-156 -29 -374 -54 -552 -64 -76 -4 -140 -10 -143 -13 -17 -17 -16 -78 3 -120 39 -90 159 -146 327 -155 280 -15 540 122 537 283 0 42 -23 96 -40 93 -4 -1 -63 -12 -132 -24z" />
              <path d="M1079 2187 c-20 -37 -12 -106 18 -155 121 -194 581 -258 779 -107 46 35 78 105 71 153 -4 19 -7 36 -9 37 -2 2 -86 8 -188 14 -214 13 -423 36 -563 60 -96 17 -98 17 -108 -2z" />
            </g>
          </svg>
        </div>
        <div className="flex-1 text-sm text-white">
          {data?.email
            ? `${data.email.slice(0, 4)}...${data.email.slice(
                data.email.length - 4,
                data.email.length
              )}`
            : ""}
        </div>
      </div>
      <div
        className="absolute inset-0 z-20 bg-secondary-500"
        style={{ opacity: 0.99 }}
      ></div>
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(135deg,#0000 18.75%,#1d212f 0 31.25%,#0000 0), repeating-linear-gradient(45deg,#1d212f -6.25% 6.25%,#ffffff 0 18.75%)",
          backgroundSize: "50px 50px",
        }}
      ></div>
    </div>
  );
}
