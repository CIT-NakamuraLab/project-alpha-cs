import React from 'react'
import Image from 'next/image'
import { useContext } from 'react'
import { HasKeyContext } from '../../pages'

export const KeyImage = () => {
  const { hasKey } = useContext(HasKeyContext)
  return (
    <>
      {hasKey ? (
        <div>
          <Image
            className='rounded-full border-2 border-black'
            width={250}
            height={250}
            src='/images/dsc_0298.jpeg'
            alt='鍵は研究室にあります'
          />
        </div>
      ) : (
        <div>
          <Image
            className='rounded-full border-2 border-black'
            width={250}
            height={250}
            src='/images/dsc_0299.jpeg'
            alt='鍵は研究室にありません'
          />
        </div>
      )}
    </>
  )
}
