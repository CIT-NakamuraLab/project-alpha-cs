import React, { useContext, useState } from 'react'
import { Layout } from '../layout/Layout'
import { KeyImage } from './KeyImage'
import { Pickup } from './Pickup'
import { MemberCount } from './MemberCount'
import { HasKeyContext } from '../../pages'
import { GeneralButton } from '../GeneralButton'

export const Contents = () => {
  const [G_AuthFlag, setG_AuthFlag] = useState(false)
  const { hasKey, setHasKey } = useContext(HasKeyContext)
  const googleSignIn = () => {
    setG_AuthFlag(prev => !prev)
  }

  return (
    <>
      {!G_AuthFlag ? (
        <div className="flex items-center justify-center py-64 h-screen">
          <div>
            <h2 className='text-center mx-16'>千葉工大のGoogleアカウントによる認証を行なってください</h2>
            <div className='mt-14 text-center'>
              <GeneralButton label='SIGN IN' clickFunction={googleSignIn} />
            </div>
          </div>
          
        </div>
      ) : (
        <Layout title='Key Manage App'>
          <div className='my-24'>
            <div className='absolute top-5 left-5'>
              <button
                className='border-2 border-black'
                onClick={() => {
                  setHasKey(prev => !prev)
                }}
              >
                {!hasKey ? (
                  <span>鍵が取得済みの時の見た目へ</span>
                ) : (
                  <span>鍵が未取得の時の見た目へ</span>
                )}
              </button>
            </div>
            <div className='flex items-center justify-center'>
              <KeyImage />
            </div>
            <div className='flex items-center justify-center'>
              <MemberCount />
            </div>
            <div className='flex items-center justify-center'>
              <Pickup />
            </div>
          </div>
        </Layout>
      )}
    </>
  )
}
