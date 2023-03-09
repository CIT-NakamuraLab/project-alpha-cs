import React from 'react'

type GeneralDividerProps = {
  label: string
}

function GeneralDivider({ label }: GeneralDividerProps) {
  return (
    <div className='flex w-full items-center justify-center'>
      <hr className='my-8 h-px w-80 border-0 bg-gray-600 md:w-96' />
      <span className='absolute left-1/3 -translate-x-1/2 bg-white px-4 text-lg font-medium text-gray-900 md:left-1/2'>
        {label}
      </span>
    </div>
  )
}

export default GeneralDivider
