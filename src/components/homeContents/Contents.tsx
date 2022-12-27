import React, {useContext, useState} from 'react'
import { Layout } from '../layout/Layout'
import { KeyImage } from './KeyImage'
import { Pickup } from './Pickup'
import { MemberCount } from './MemberCount'
import { HasKeyContext } from '../../pages'

export const Contents = () => {
  const [g_AuthFlag, setG_AuthFlag] = useState(false)
  const {hasKey,setHasKey} = useContext(HasKeyContext)
  return (
    <>
      {!g_AuthFlag 
        ? <div className="my-64">
            <h2 className="text-center">千葉工大のGoogleアカウントによる認証を行なってください</h2>
            <div className='mt-14 text-center'>
              <button
                className='mx-auto block h-20 w-40 rounded-full bg-black py-3 px-10 text-xs uppercase text-white hover:bg-gray-700'
                onClick={() => {
                  setG_AuthFlag(prev => !prev)
                }}
              >
                <p className='text-base'>Sign In</p>
              </button>
            </div>
          </div>
        : <Layout title='Key Manage App'>
            <div className='mt-24'>
              <div className="absolute top-5 left-5">
                <button 
                  className="border-2 border-black"
                  onClick={() => {
                    setHasKey(prev => !prev)
                  }}
                >{!hasKey ? <span>鍵が取得済みの時の見た目へ</span> : <span>鍵が未取得の時の見た目へ</span>}</button>
              </div>
              <div className='flex justify-center items-center'>
                <KeyImage />
              </div>
              <div className='flex justify-center items-center'>
                <MemberCount />
              </div>
              <div className='flex justify-center items-center'>
                <Pickup />
              </div>
            </div>
          </Layout>
      }   
    </>
    
  )
}
