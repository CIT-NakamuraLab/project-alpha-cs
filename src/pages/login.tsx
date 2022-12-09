import { signIn } from 'next-auth/react'
import Head from 'next/head'
import React from 'react'

function login() {
  return (
    <div>
      <Head>
        <title>Login Required</title>
      </Head>

      <div className='relative flex min-h-screen w-screen select-none flex-col items-center justify-center space-y-6'>
        <p className='p-5'>
          このサービスを利用する場合、研究室から通達されたSlackアカウントでログインする必要があります
        </p>
        <button
          className='rounded-full bg-green-600 px-6 py-2 text-white shadow-xl'
          onClick={() => {
            signIn('slack')
          }}
        >
          ログイン
        </button>
      </div>
    </div>
  )
}

export default login
