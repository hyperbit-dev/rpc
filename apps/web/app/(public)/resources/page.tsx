import { Container } from "@/_components/Container";

export default function ResourcePage() {
  return (
    <Container>
      <div className="max-w-3xl mx-auto my-12 text-center">
        <h1 className="mb-2 text-4xl font-bold">
          Empowering Crypto Enthusiasts
        </h1>
        <p className="text-lg leading-tight">
          Dive into our extensive library of GitHub resources, carefully
          selected to inspire, educate, and empower individuals passionate about
          the world of blockchain technology.
        </p>
      </div>
      <div className="grid max-w-3xl grid-cols-2 mx-auto my-12 text-center sm:grid-cols-3 md:grid-cols-4">
        <a
          href="https://github.com/hyperbit-dev/chains"
          target="_blank"
          className="flex flex-col items-center justify-center block gap-2 p-4 border border-gray-200 action:bg-brand-100 action:outline-brand-300"
        >
          <svg
            fill="#5fc77e"
            height="50px"
            width="50px"
            version="1.1"
            viewBox="0 0 31.891 31.891"
            className="p-2"
          >
            <g>
              <path d="M30.543,5.74l-4.078-4.035c-1.805-1.777-4.736-1.789-6.545-0.02l-4.525,4.414c-1.812,1.768-1.82,4.648-0.02,6.424   l2.586-2.484c-0.262-0.791,0.061-1.697,0.701-2.324l2.879-2.807c0.912-0.885,2.375-0.881,3.275,0.01l2.449,2.42   c0.9,0.891,0.896,2.326-0.01,3.213l-2.879,2.809c-0.609,0.594-1.609,0.92-2.385,0.711l-2.533,2.486   c1.803,1.781,4.732,1.789,6.545,0.02l4.52-4.41C32.34,10.396,32.346,7.519,30.543,5.74z" />
              <path d="M13.975,21.894c0.215,0.773-0.129,1.773-0.752,2.381l-2.689,2.627c-0.922,0.9-2.414,0.895-3.332-0.012l-2.498-2.461   c-0.916-0.906-0.91-2.379,0.012-3.275l2.691-2.627c0.656-0.637,1.598-0.961,2.42-0.689l2.594-2.57   c-1.836-1.811-4.824-1.82-6.668-0.02l-4.363,4.26c-1.846,1.803-1.855,4.734-0.02,6.549l4.154,4.107   c1.834,1.809,4.82,1.818,6.668,0.018l4.363-4.26c1.844-1.805,1.852-4.734,0.02-6.547L13.975,21.894z" />
              <path d="M11.139,20.722c0.611,0.617,1.611,0.623,2.234,0.008l7.455-7.416c0.621-0.617,0.625-1.615,0.008-2.234   c-0.613-0.615-1.611-0.619-2.23-0.006l-7.457,7.414C10.529,19.103,10.525,20.101,11.139,20.722z" />
            </g>
          </svg>
          <h3 className="text-sm font-medium">Chains</h3>
        </a>

        <a
          href="https://github.com/hyperbit-dev/mnemonic"
          target="_blank"
          className="flex flex-col items-center justify-center block gap-2 p-4 border border-gray-200 action:bg-brand-100 action:outline-brand-300"
        >
          <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none">
            <rect
              x="5.5"
              y="5.5"
              width="13"
              height="13"
              rx="1"
              stroke="#5fc77e"
            />
            <path d="M15 16H16.5" stroke="#5fc77e" stroke-linecap="round" />
            <path d="M11.5 16H13" stroke="#5fc77e" stroke-linecap="round" />
            <path d="M8 16H9.5" stroke="#5fc77e" stroke-linecap="round" />
            <path
              d="M15 13.3333H16.5"
              stroke="#5fc77e"
              stroke-linecap="round"
            />
            <path
              d="M11.5 13.3333H13"
              stroke="#5fc77e"
              stroke-linecap="round"
            />
            <path d="M8 13.3334H9.5" stroke="#5fc77e" stroke-linecap="round" />
            <path
              d="M15 10.6667H16.5"
              stroke="#5fc77e"
              stroke-linecap="round"
            />
            <path
              d="M11.5 10.6667H13"
              stroke="#5fc77e"
              stroke-linecap="round"
            />
            <path d="M8 10.6667H9.5" stroke="#5fc77e" stroke-linecap="round" />
            <path d="M15 8H16.5" stroke="#5fc77e" stroke-linecap="round" />
            <path d="M11.5 8H13" stroke="#5fc77e" stroke-linecap="round" />
            <path d="M8 8H9.5" stroke="#5fc77e" stroke-linecap="round" />
          </svg>
          <h3 className="text-sm font-medium">Mnemonic</h3>
        </a>

        <a
          href="https://github.com/hyperbit-dev/message"
          target="_blank"
          className="flex flex-col items-center justify-center block gap-2 p-4 border border-gray-200 action:bg-brand-100 action:outline-brand-300"
        >
          <svg
            fill="#5fc77e"
            width="50px"
            height="50px"
            viewBox="0 0 56 56"
            className="p-1"
          >
            <path d="M 13.1615 50.9014 C 14.1949 50.9014 14.8969 50.5505 16.1448 49.4585 L 22.6963 43.6090 C 24.0807 45.1494 26.2255 45.9683 28.9358 45.9683 L 35.6433 45.9683 L 42.1752 51.5449 C 43.3452 52.5588 43.9885 53.0853 44.9441 53.0853 C 46.2895 53.0853 47.0306 52.1299 47.0306 50.6479 L 47.0306 45.9683 L 47.8493 45.9683 C 52.7435 45.9683 56.0000 43.0240 56.0000 37.9154 L 56.0000 26.3917 C 56.0000 21.2831 52.7435 18.3388 47.8493 18.3388 L 44.7880 18.3388 L 44.7880 16.8570 C 44.7880 11.5533 41.6489 8.4921 36.3454 8.4921 L 8.4624 8.4921 C 3.3537 8.4921 0 11.5533 0 16.8570 L 0 34.8151 C 0 40.1187 3.3537 43.1800 8.4624 43.1800 L 11.0362 43.1800 L 11.0362 48.5031 C 11.0362 50.0045 11.7771 50.9014 13.1615 50.9014 Z M 13.9804 41.8736 C 13.9804 40.7622 13.2980 40.2357 12.4595 40.2357 L 8.6378 40.2357 C 5.1866 40.2357 3.1393 38.3639 3.1393 34.7177 L 3.1393 16.9544 C 3.1393 13.3277 5.1866 11.4169 8.6378 11.4169 L 36.1505 11.4169 C 39.6015 11.4169 41.6489 13.3277 41.6489 16.9544 L 41.6489 18.3388 L 28.9358 18.3388 C 23.8272 18.3388 20.7855 21.2831 20.7855 26.3917 L 20.7855 37.9154 C 20.7855 38.9683 20.9024 39.9238 21.1559 40.8012 L 13.9804 47.4307 Z M 44.1055 49.5561 L 37.8468 43.9405 C 37.0666 43.2580 36.5989 43.0435 35.5263 43.0435 L 29.1113 43.0435 C 25.8551 43.0435 23.9247 41.2692 23.9247 37.8179 L 23.9247 26.4893 C 23.9247 23.0575 25.8551 21.2637 29.1113 21.2637 L 47.6740 21.2637 C 50.9301 21.2637 52.8605 23.0575 52.8605 26.4893 L 52.8605 37.8179 C 52.8605 41.2692 50.9105 43.0435 47.6740 43.0435 L 45.6266 43.0435 C 44.7880 43.0435 44.1055 43.5310 44.1055 44.6424 Z" />
          </svg>
          <h3 className="text-sm font-medium">Message</h3>
        </a>

        <a
          href="https://github.com/hyperbit-dev/message-nextjs"
          target="_blank"
          className="flex flex-col items-center justify-center block gap-2 p-4 border border-gray-200 action:bg-brand-100 action:outline-brand-300"
        >
          <svg
            fill="#5fc77e"
            width="50px"
            height="50px"
            viewBox="0 0 56 56"
            className="p-1"
          >
            <path d="M 13.1615 50.9014 C 14.1949 50.9014 14.8969 50.5505 16.1448 49.4585 L 22.6963 43.6090 C 24.0807 45.1494 26.2255 45.9683 28.9358 45.9683 L 35.6433 45.9683 L 42.1752 51.5449 C 43.3452 52.5588 43.9885 53.0853 44.9441 53.0853 C 46.2895 53.0853 47.0306 52.1299 47.0306 50.6479 L 47.0306 45.9683 L 47.8493 45.9683 C 52.7435 45.9683 56.0000 43.0240 56.0000 37.9154 L 56.0000 26.3917 C 56.0000 21.2831 52.7435 18.3388 47.8493 18.3388 L 44.7880 18.3388 L 44.7880 16.8570 C 44.7880 11.5533 41.6489 8.4921 36.3454 8.4921 L 8.4624 8.4921 C 3.3537 8.4921 0 11.5533 0 16.8570 L 0 34.8151 C 0 40.1187 3.3537 43.1800 8.4624 43.1800 L 11.0362 43.1800 L 11.0362 48.5031 C 11.0362 50.0045 11.7771 50.9014 13.1615 50.9014 Z M 13.9804 41.8736 C 13.9804 40.7622 13.2980 40.2357 12.4595 40.2357 L 8.6378 40.2357 C 5.1866 40.2357 3.1393 38.3639 3.1393 34.7177 L 3.1393 16.9544 C 3.1393 13.3277 5.1866 11.4169 8.6378 11.4169 L 36.1505 11.4169 C 39.6015 11.4169 41.6489 13.3277 41.6489 16.9544 L 41.6489 18.3388 L 28.9358 18.3388 C 23.8272 18.3388 20.7855 21.2831 20.7855 26.3917 L 20.7855 37.9154 C 20.7855 38.9683 20.9024 39.9238 21.1559 40.8012 L 13.9804 47.4307 Z M 44.1055 49.5561 L 37.8468 43.9405 C 37.0666 43.2580 36.5989 43.0435 35.5263 43.0435 L 29.1113 43.0435 C 25.8551 43.0435 23.9247 41.2692 23.9247 37.8179 L 23.9247 26.4893 C 23.9247 23.0575 25.8551 21.2637 29.1113 21.2637 L 47.6740 21.2637 C 50.9301 21.2637 52.8605 23.0575 52.8605 26.4893 L 52.8605 37.8179 C 52.8605 41.2692 50.9105 43.0435 47.6740 43.0435 L 45.6266 43.0435 C 44.7880 43.0435 44.1055 43.5310 44.1055 44.6424 Z" />
          </svg>
          <h3 className="text-sm font-medium">Message NextJS</h3>
        </a>

        <a
          href="https://github.com/hyperbit-dev/rpc"
          target="_blank"
          className="flex flex-col items-center justify-center block gap-2 p-4 border border-gray-200 action:bg-brand-100 action:outline-brand-300"
        >
          <svg
            fill="#5fc77e"
            width="50px"
            height="50px"
            viewBox="0 0 32 32"
            id="icon"
            className="p-1"
          >
            <path
              d="M26,22a3.86,3.86,0,0,0-2,.57l-3.09-3.1a6,6,0,0,0,0-6.94L24,9.43A3.86,3.86,0,0,0,26,10a4,4,0,1,0-4-4,3.86,3.86,0,0,0,.57,2l-3.1,3.09a6,6,0,0,0-6.94,0L9.43,8A3.86,3.86,0,0,0,10,6a4,4,0,1,0-4,4,3.86,3.86,0,0,0,2-.57l3.09,3.1a6,6,0,0,0,0,6.94L8,22.57A3.86,3.86,0,0,0,6,22a4,4,0,1,0,4,4,3.86,3.86,0,0,0-.57-2l3.1-3.09a6,6,0,0,0,6.94,0L22.57,24A3.86,3.86,0,0,0,22,26a4,4,0,1,0,4-4ZM26,4a2,2,0,1,1-2,2A2,2,0,0,1,26,4ZM4,6A2,2,0,1,1,6,8,2,2,0,0,1,4,6ZM6,28a2,2,0,1,1,2-2A2,2,0,0,1,6,28Zm10-8a4,4,0,1,1,4-4A4,4,0,0,1,16,20Zm10,8a2,2,0,1,1,2-2A2,2,0,0,1,26,28Z"
              transform="translate(0 0)"
            />
            <rect fill="none" width="32" height="32" />
          </svg>
          <h3 className="text-sm font-medium">RPC</h3>
        </a>

        <a
          href="https://github.com/hyperbit-dev/rpc-faucet"
          target="_blank"
          className="flex flex-col items-center justify-center block gap-2 p-4 border border-gray-200 action:bg-brand-100 action:outline-brand-300"
        >
          <svg
            width="50px"
            height="50px"
            viewBox="0 0 48 48"
            className="p-1"
            fill="#5fc77e"
          >
            <g data-name="invisible box">
              <rect width="48" height="48" fill="none" />
            </g>

            <g>
              <path d="M32,10H21V6h5a2,2,0,0,0,0-4H12a2,2,0,0,0,0,4h5v4H9a2.9,2.9,0,0,0-3,3v8a2.9,2.9,0,0,0,3,3H28v7a2.9,2.9,0,0,0,3,3h8a2.9,2.9,0,0,0,3-3V20A10,10,0,0,0,32,10Zm6,20H32V23a2.9,2.9,0,0,0-3-3H10V14H32a6,6,0,0,1,6,6Z" />
              <path d="M35,36l-3,3.4a3.9,3.9,0,0,0,.4,5.6,4,4,0,0,0,5.2,0,3.9,3.9,0,0,0,.4-5.6Z" />
            </g>
          </svg>
          <h3 className="text-sm font-medium">RPC Faucet</h3>
        </a>
      </div>
    </Container>
  );
}
