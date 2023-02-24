import React, { useContext } from 'react'
import { useSession } from 'next-auth/react'
import { Layout } from '../layout/Layout'
import { KeyImage } from './KeyImage'
import { Pickup } from './Pickup'
import { MemberCount } from './MemberCount'
import { HasKeyContext } from '../../pages'
import { GeneralButton } from '../GeneralButton'
import { useRouter } from 'next/router'
import type { User } from '@prisma/client'

//ログのデータから鍵の有無を確認して画面を切り替える
//鍵の有無は、「has_keyがtrueの後に退室もしくは途中退室でhas_keyがtrue」であった場合は鍵がないということ
export const Contents = ({ authUrl, users }: { authUrl: string; users: User[] }) => {
  const router = useRouter()
  const session = useSession()
  const { hasKey, setHasKey } = useContext(HasKeyContext)
  const user_id = session.data?.user?.id
  const myAccount = users.filter(user => user_id === user.id)
  const G_AuthFlag = myAccount[0]?.student_id ? true : false
  const googleSignIn = () => {
    router.push(authUrl)
  }

  return (
    <>
      {!G_AuthFlag ? (
        <div className='flex h-screen items-center justify-center py-64'>
          <div>
            <h2 className='mx-16 text-center'>
              千葉工大のGoogleアカウントによる認証を行なってください
            </h2>
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
