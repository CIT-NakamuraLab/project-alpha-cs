import React from 'react'
import type { FC } from 'react'

type Props = {
  clickFunction: () => void
}

export const SignInButton: FC<Props> = ({ clickFunction }) => {
  return (
    <div className='mt-14 text-center'>
      <button
        onClick={clickFunction}
        className='mx-auto block h-20 w-40 rounded-full bg-black py-3 px-10 text-xs uppercase text-white hover:bg-gray-700'
      >
        <p className='text-base'>Sign In</p>
      </button>
    </div>
  )
}
