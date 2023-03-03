import React, { useContext } from 'react'
import { useSession } from 'next-auth/react'
import { Layout } from '../layout/Layout'
import { KeyImage } from './KeyImage'
import { Pickup } from './Pickup'
import { MemberCount } from './MemberCount'
import { HasKeyContext } from '../../pages'
import { GeneralButton } from '../GeneralButton'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import type { User, Log } from '@prisma/client'
import { LogType } from '../../utils/const'

export const Contents = ({
  authUrl,
  users,
  logs
}: {
  authUrl: string
  users: User[]
  logs: Log[]
}) => {
  const router = useRouter()
  const session = useSession()
  const { setHasKey } = useContext(HasKeyContext)

  const user_id = session.data?.user?.id
  const myAccount = users.filter(user => user_id === user.id)
  const myAccountStudent_id = myAccount[0]?.student_id
  const G_AuthFlag = myAccountStudent_id ? true : false

  useEffect(() => {
    const typeIsOtherThanPickUp_array = logs.filter(log => log.type !== LogType.KEY_PICKUP)
    const latestLog = typeIsOtherThanPickUp_array[typeIsOtherThanPickUp_array.length - 1]
    if (latestLog?.has_key) {
      switch (latestLog.type) {
        case 0:
          setHasKey(true)
          break
        case 1:
        case 2:
          setHasKey(false)
          break
        default:
          break
      }
    }
    return
  })

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
            <div className='flex items-center justify-center'>
              <KeyImage />
            </div>
            <div className='flex items-center justify-center'>
              <MemberCount />
            </div>
            <div className='flex items-center justify-center'>
              <Pickup logs={logs} users={users} student_id={myAccountStudent_id} />
            </div>
          </div>
        </Layout>
      )}
    </>
  )
}
