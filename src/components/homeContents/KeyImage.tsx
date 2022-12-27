import React from 'react'
import Image from 'next/image'

export const KeyImage = () => {
  const hasKey = true
  return (
    <>
      { hasKey
        ? (
            <div>
              <Image
                className='rounded-full border-4 border-black' 
                width={200} 
                height={200} 
                src="/images/dsc_0298.jpeg" 
                alt="鍵は研究室にあります"
              />
            </div>
        )
        : (
            <div>
              <Image 
                className='rounded-full border-4 border-black' 
                width={200} 
                height={200} 
                src="/images/dsc_0299.jpeg" 
                alt="鍵は研究室にありません" 
              />
            </div>
        )  
      }
    </>
  )
}
