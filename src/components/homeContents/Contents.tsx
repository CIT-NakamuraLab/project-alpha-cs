import React, { useContext, useState } from 'react'
import { Layout } from '../layout/Layout'
import { KeyImage } from './KeyImage'
import { Pickup } from './Pickup'
import { MemberCount } from './MemberCount'
import { HasKeyContext } from '../../pages'
import { SignInButton } from '../SignInButton'

export const Contents = () => {
  const [G_AuthFlag, setG_AuthFlag] = useState(false)
  const { hasKey, setHasKey } = useContext(HasKeyContext)
  const googleSignIn = () => {
    setG_AuthFlag(prev => !prev)
  }

  return (
    <>
      {!G_AuthFlag ? (
        <div className='my-64'>
          <h2 className='text-center'>千葉工大のGoogleアカウントによる認証を行なってください</h2>
          <SignInButton clickFunction={googleSignIn} />
        </div>
      ) : (
        <Layout title='Key Manage App'>
          <div className='mt-24'>
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
