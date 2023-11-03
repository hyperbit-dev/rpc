import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

export default function NextPage() {
  return (
    <React.Fragment>
      <Head>
        <title>Hyperbit</title>
      </Head>
      <div className="grid w-full text-2xl text-center grid-col-1">
        <div>
          <Image
            className="ml-auto mr-auto"
            src="/images/logo.png"
            alt="Logo image"
            width="256px"
            height="256px"
          />
        </div>
        <span>⚡ Nextron ⚡</span>
      </div>
      <div className="flex flex-wrap justify-center w-full mt-1">
        <Link href="/">
          <a className="btn-blue">Go to home page</a>
        </Link>
      </div>
    </React.Fragment>
  )
}
