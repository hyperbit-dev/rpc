import { Container } from "@/_components/Container";
import { Button, Chip } from "@hyperbitui/react";
import { search } from "./[blockchain]/actions";
import Link from "next/link";
import Image from "next/image";

export default function Explorers() {
  return (
    <Container className="mb-4">
      <div className="py-12 text-center">
        <h1 className="mb-1 text-4xl font-medium">Blockchain Explorers</h1>
        <p className="text-sm">
          Your compass in navigating the blockchain data terrain
        </p>
      </div>
      <form
        action={search}
        className="grid md:grid-cols-[175px_175px_auto_150px] gap-2 my-3"
      >
        <select
          className="p-3 pr-6 text-sm duration-300 rounded-md"
          name="blockchain"
          defaultValue="trvn"
        >
          <option value="trvn">Ravencoin (Testnet)</option>
          <option value="tevr">Evrmore (Testnet)</option>
          <option value="mewc">Meowcoin</option>
          <option value="tmewc">Meowcoin (Testnet)</option>
        </select>
        <select
          className="p-3 pr-6 text-sm duration-300 rounded-md"
          name="type"
        >
          <option value="address">Address</option>
          <option value="height">Block Height</option>
          <option value="hash">Block Hash</option>
          <option value="transaction">Transaction Hash</option>
          <option value="asset">Asset Name</option>
        </select>
        <input
          type="text"
          className="w-full p-3 rounded-md placeholder:text-white"
          placeholder="Search for blocks, transactions, addresses, and assets..."
          name="query"
        />
        <Button type="submit" className="px-8 select-none">
          Search
        </Button>
      </form>
      <h2 className="mb-4">Mainnet</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        <Link
          href="/explorers/mewc"
          className="flex flex-row items-center gap-4 p-4 border border-gray-300 rounded-md select-none action:bg-brand-100 action:border-brand-200 action:outline-brand-200"
        >
          <svg
            data-bbox="817.8 771.8 2460.4 2296.4"
            viewBox="817.8 771.8 2460.4 2296.4"
            height="50"
            width="50"
          >
            <g>
              <path
                fill="#f2cdad"
                d="M1966 935.8h-164.1v328.1H2130V935.8h-164z"
                data-color="1"
              ></path>
              <path
                fill="#f2cdad"
                d="M981.8 1099.8v164.1h164V935.8h-164v164z"
                data-color="1"
              ></path>
              <path
                fill="#5b5f6e"
                d="M1145.8 1263.9v164h164.1v-328.1h-164.1v164.1z"
                data-color="2"
              ></path>
              <path
                fill="#5b5f6e"
                d="M1801.9 1099.8v164h-164v-164h164z"
                data-color="2"
              ></path>
              <path
                fill="#5b5f6e"
                d="M1637.9 1263.9v164h-164v-164h164z"
                data-color="2"
              ></path>
              <path
                fill="#342606"
                d="M1145.8 1756v164h164.1v-328.1h-164.1V1756z"
                data-color="3"
              ></path>
              <path
                fill="#342606"
                d="M1637.9 1591.9V1920h164v-328.1h-164z"
                data-color="3"
              ></path>
              <path
                fill="#ff987f"
                d="M1473.9 1920v164h-164v-164h164z"
                data-color="4"
              ></path>
              <path
                fill="#bc8312"
                d="M2130 1756v-492.1h-492.1v164h-164V1756h164v-164.1h164V1920H2130v-164z"
                data-color="5"
              ></path>
              <path
                fill="#bc8312"
                d="M981.8 1427.9v164h164v-328h-164v164z"
                data-color="5"
              ></path>
              <path
                fill="#bc8312"
                d="M2950.2 1756h-164.1v328h-164v164.1h328.1V1920h164v-164h-164z"
                data-color="5"
              ></path>
              <path
                fill="#bc8312"
                d="M2622.1 2248.1v164h-164v-164h164z"
                data-color="5"
              ></path>
              <path
                fill="#bc8312"
                d="M2294 2084h-164v164.1h328.1V2084H2294z"
                data-color="5"
              ></path>
              <path
                fill="#020000"
                d="M1309.8 935.8v164h-164v-164h164z"
                data-color="6"
              ></path>
              <path
                fill="#020000"
                d="M1473.9 1263.9h164v-164.1h-328v164.1h164z"
                data-color="6"
              ></path>
              <path
                fill="#020000"
                d="M1801.9 935.8v164h-164v-164h164z"
                data-color="6"
              ></path>
              <path
                fill="#020000"
                d="M2130 935.8V2084h328.1v-164H2294V771.8h-492.1v164H2130z"
                data-color="6"
              ></path>
              <path
                fill="#020000"
                d="M981.8 1756V935.8h164v-164h-328V2084h164v-328z"
                data-color="6"
              ></path>
              <path
                fill="#020000"
                d="M1145.8 2084v164h-164v-164h164z"
                data-color="6"
              ></path>
              <path
                fill="#020000"
                d="M2130 2084v164h-164v-164h164z"
                data-color="6"
              ></path>
              <path
                fill="#020000"
                d="M2622.1 2084v164h-164v-164h164z"
                data-color="6"
              ></path>
              <path
                fill="#020000"
                d="M2786.1 1920v-164h-164v328h164v-164z"
                data-color="6"
              ></path>
              <path
                fill="#020000"
                d="M3114.2 1756v-164.1h-328.1V1756h328.1z"
                data-color="6"
              ></path>
              <path
                fill="#020000"
                d="M3114.2 1756v164h-164v328.1h164V2084h164v-328h-164z"
                data-color="6"
              ></path>
              <path
                fill="#020000"
                d="M2622.1 2248.1v656.1h-164v-328.1H2294v164.1h-328v-164.1h-164.1v328.1h-164v-328.1h-164v328.1h-164v-656.1h-164.1v820.1H1966v-164h164v164h656.1v-656.1h164.1v-164h-328.1z"
                data-color="6"
              ></path>
              <path
                fill="#feffff"
                d="M2458.1 2412.1v-164H1966V2084h164v-164h-492.1v-164h-164v-492.1h-164v164h-164.1v164h164.1V1920h164v164h-164v-164h-164.1v-328.1h-164V2084h164v164.1h164.1v656.1h164v-328.1h164v328.1h164v-328.1H1966v164.1h328v-164.1h164.1v328.1h164v-492.1h-164z"
                data-color="7"
              ></path>
            </g>
          </svg>
          <div>
            <h3>Meowcoin</h3>
          </div>
        </Link>
      </div>
      <h2 className="my-4">Testnet</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        <Link
          href="/explorers/trvn"
          className="flex flex-row items-center gap-4 p-4 border border-gray-300 rounded-md select-none action:bg-brand-100 action:border-brand-200 action:outline-brand-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 205.3 338.8"
            height="50"
            width="50"
          >
            <path
              fill="#384182"
              d="M89 274.9L0 338.8l56.5-260zm1.8-.6l54.2.7L58.6 79.8zm59.3-4.3l41.5-153.8L175.9 97zm-20-241.1l-68.3 46 99.8-32.3zm-8.6 0l-42.4 1.4L72.9 48z"
            />
            <path
              fill="#f79534"
              d="M172.9 91.1l-109.3-15 98.5-31zM147 33.3l6-16.3-31.5-13.7zm9.1-17.9l7.1 25.6 42-11.1z"
            />
            <path
              fill="#f0513a"
              d="M147.4 274L59.8 78 174 94zM126.8 28.9L72.8 50l-13 24zm-33.5-16L79.8 27.8l44.8-1.1zm23.6-11.6l-21.4 9.9 48.8 21.5zM141.3 0h-23l35.6 13.8zm13.3 18.3l-5.5 16.4 11 5.3z"
            />
          </svg>
          <div>
            <h3>Ravencoin</h3>
          </div>
        </Link>
        <Link
          href="/explorers/tevr"
          className="flex flex-row items-center gap-4 p-4 border border-gray-300 rounded-md select-none action:bg-brand-100 action:border-brand-200 action:outline-brand-200"
        >
          <Image
            src="/blockchains/evrmore.png"
            height="50"
            width="50"
            alt="Evrmore Logo"
          />
          <div>
            <h3>Evrmore</h3>
          </div>
        </Link>
        <Link
          href="/explorers/tmewc"
          className="flex flex-row items-center gap-4 p-4 border border-gray-300 rounded-md select-none action:bg-brand-100 action:border-brand-200 action:outline-brand-200"
        >
          <svg
            data-bbox="817.8 771.8 2460.4 2296.4"
            viewBox="817.8 771.8 2460.4 2296.4"
            height="50"
            width="50"
          >
            <g>
              <path
                fill="#f2cdad"
                d="M1966 935.8h-164.1v328.1H2130V935.8h-164z"
                data-color="1"
              ></path>
              <path
                fill="#f2cdad"
                d="M981.8 1099.8v164.1h164V935.8h-164v164z"
                data-color="1"
              ></path>
              <path
                fill="#5b5f6e"
                d="M1145.8 1263.9v164h164.1v-328.1h-164.1v164.1z"
                data-color="2"
              ></path>
              <path
                fill="#5b5f6e"
                d="M1801.9 1099.8v164h-164v-164h164z"
                data-color="2"
              ></path>
              <path
                fill="#5b5f6e"
                d="M1637.9 1263.9v164h-164v-164h164z"
                data-color="2"
              ></path>
              <path
                fill="#342606"
                d="M1145.8 1756v164h164.1v-328.1h-164.1V1756z"
                data-color="3"
              ></path>
              <path
                fill="#342606"
                d="M1637.9 1591.9V1920h164v-328.1h-164z"
                data-color="3"
              ></path>
              <path
                fill="#ff987f"
                d="M1473.9 1920v164h-164v-164h164z"
                data-color="4"
              ></path>
              <path
                fill="#bc8312"
                d="M2130 1756v-492.1h-492.1v164h-164V1756h164v-164.1h164V1920H2130v-164z"
                data-color="5"
              ></path>
              <path
                fill="#bc8312"
                d="M981.8 1427.9v164h164v-328h-164v164z"
                data-color="5"
              ></path>
              <path
                fill="#bc8312"
                d="M2950.2 1756h-164.1v328h-164v164.1h328.1V1920h164v-164h-164z"
                data-color="5"
              ></path>
              <path
                fill="#bc8312"
                d="M2622.1 2248.1v164h-164v-164h164z"
                data-color="5"
              ></path>
              <path
                fill="#bc8312"
                d="M2294 2084h-164v164.1h328.1V2084H2294z"
                data-color="5"
              ></path>
              <path
                fill="#020000"
                d="M1309.8 935.8v164h-164v-164h164z"
                data-color="6"
              ></path>
              <path
                fill="#020000"
                d="M1473.9 1263.9h164v-164.1h-328v164.1h164z"
                data-color="6"
              ></path>
              <path
                fill="#020000"
                d="M1801.9 935.8v164h-164v-164h164z"
                data-color="6"
              ></path>
              <path
                fill="#020000"
                d="M2130 935.8V2084h328.1v-164H2294V771.8h-492.1v164H2130z"
                data-color="6"
              ></path>
              <path
                fill="#020000"
                d="M981.8 1756V935.8h164v-164h-328V2084h164v-328z"
                data-color="6"
              ></path>
              <path
                fill="#020000"
                d="M1145.8 2084v164h-164v-164h164z"
                data-color="6"
              ></path>
              <path
                fill="#020000"
                d="M2130 2084v164h-164v-164h164z"
                data-color="6"
              ></path>
              <path
                fill="#020000"
                d="M2622.1 2084v164h-164v-164h164z"
                data-color="6"
              ></path>
              <path
                fill="#020000"
                d="M2786.1 1920v-164h-164v328h164v-164z"
                data-color="6"
              ></path>
              <path
                fill="#020000"
                d="M3114.2 1756v-164.1h-328.1V1756h328.1z"
                data-color="6"
              ></path>
              <path
                fill="#020000"
                d="M3114.2 1756v164h-164v328.1h164V2084h164v-328h-164z"
                data-color="6"
              ></path>
              <path
                fill="#020000"
                d="M2622.1 2248.1v656.1h-164v-328.1H2294v164.1h-328v-164.1h-164.1v328.1h-164v-328.1h-164v328.1h-164v-656.1h-164.1v820.1H1966v-164h164v164h656.1v-656.1h164.1v-164h-328.1z"
                data-color="6"
              ></path>
              <path
                fill="#feffff"
                d="M2458.1 2412.1v-164H1966V2084h164v-164h-492.1v-164h-164v-492.1h-164v164h-164.1v164h164.1V1920h164v164h-164v-164h-164.1v-328.1h-164V2084h164v164.1h164.1v656.1h164v-328.1h164v328.1h164v-328.1H1966v164.1h328v-164.1h164.1v328.1h164v-492.1h-164z"
                data-color="7"
              ></path>
            </g>
          </svg>
          <div>
            <h3>Meowcoin</h3>
          </div>
        </Link>
      </div>
    </Container>
  );
}
