import Head from 'next/head'
import { useSession } from 'next-auth/react'
import { TbMenu2 } from 'react-icons/tb'
import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const { data: session, status } = useSession()

  if (session && status == 'authenticated') {
    console.log(session)
  }

  const [pickUp, setPickUp] = useState(false)

  const togglePickUp = () => {
    setPickUp(prevState => !prevState)
  }

  return (
    <div>
      <Head>
        <title>Key Manage Project</title>
        <meta name='description' content='Key Manage Project' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='relative flex min-h-screen w-screen select-none flex-col items-center justify-center'>
        <Link href='/settings/profile'>
          <TbMenu2 className='absolute top-5 right-5 h-10 w-10 cursor-pointer hover:shadow-2xl' />
        </Link>

        <p className='text-2xl'>メインメニュー</p>

        <div className='py-5' />

        {pickUp && <p className='text-xl text-blue-500'>名前太郎が取りに行っています...</p>}

        <div className='m-1' />

        <div className='py-5' />
        {!pickUp && (
          <button
            className='rounded-full bg-rose-500 px-4 py-2 shadow-xl'
            onClick={() => {
              togglePickUp()
            }}
          >
            取りに行く
          </button>
        )}

        <div className='m-2' />
        <button
          className='rounded-full bg-indigo-500 px-4 py-2 shadow-md'
          onClick={() => {
            setPickUp(false)
          }}
        >
          取りに行く強制解除
        </button>
      </div>
    </div>
  )
}
