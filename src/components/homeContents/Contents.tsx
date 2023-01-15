import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { Layout } from '../layout/Layout'
import { KeyImage } from './KeyImage'
import { Pickup } from './Pickup'
import { MemberCount } from './MemberCount'
import { HasKeyContext } from '../../pages'
import { GeneralButton } from '../GeneralButton'

type Props = {
  authUrl: string
}

export const Contents = ({authUrl}: Props) => {
  //const [G_AuthFlag, setG_AuthFlag] = useState(false)
  const G_AuthFlag = false
  const { hasKey, setHasKey } = useContext(HasKeyContext)
  const router = useRouter()
  const googleSignIn = () => {
    //setG_AuthFlag(prev => !prev)
    router.push(authUrl)
  }

  return (
    <>
      {!G_AuthFlag ? (
        <div className='my-64'>
          <h2 className='text-center'>千葉工大のGoogleアカウントによる認証を行なってください</h2>
          <div className='mt-14 text-center'>
            <GeneralButton label='SIGN IN' clickFunction={googleSignIn} />
          </div>
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
