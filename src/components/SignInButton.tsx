import React from 'react'
import type { FC } from 'react'
import { signIn } from 'next-auth/react'

type Props = {
  type: string
}

export const SigninButton: FC<Props> = ({ type }) => {
  return (
    <div className='mt-14 text-center'>
      <button
        onClick={() => signIn(type)}
        className='mx-auto block h-20 w-40 rounded-full bg-black py-3 px-10 text-xs uppercase text-white hover:bg-gray-700'
      >
        <p className='text-base'>Sign In</p>
      </button>
    </div>
  )
}
