import React from 'react'
import type { FC } from 'react'

type Props = {
  label: string
  clickFunction: () => void
}

export const GeneralButton: FC<Props> = ({ label, clickFunction }) => {
  return (
    <button
      onClick={clickFunction}
      className='mx-auto block h-20 w-40 rounded-full bg-black py-3 px-10 text-xs uppercase text-white hover:bg-gray-700'
    >
      <p className='text-base'>{label}</p>
    </button>
  )
}
