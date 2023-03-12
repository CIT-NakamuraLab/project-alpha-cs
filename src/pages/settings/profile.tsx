import Head from 'next/head'
import SettingMenu, { Select } from '../../components/SettingMenu'
import { signOut, useSession } from 'next-auth/react'
import { authOptions } from '../api/auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth'
import { GeneralButton } from '../../components/GeneralButton'
import type { GetServerSideProps } from 'next/types'
import { prisma } from '../../server/db/client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

function Profile(props: { isAdmin: boolean }) {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      if (!session) {
        router.replace('/')
      }
    }
  }, [router, session])

  return (
    <div>
      <Head>
        <title>プロファイル設定</title>
      </Head>

      <SettingMenu
        select={Select.Profile}
        title='プロファイル設定'
        isAdmin={props.isAdmin}
        bodyElement={
          <div className='mt-40 text-center'>
            <GeneralButton
              label='SIGN OUT'
              clickFunction={() => {
                signOut({ callbackUrl: 'https://localhost:3000' })
              }}
            />
          </div>
        }
      />
    </div>
  )
}

export default Profile

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await unstable_getServerSession(context.req, context.res, authOptions)
  if (!session) {
    return {
      props: {
        isAdmin: false
      }
    }
  }

  const result = await prisma.user.findUnique({
    where: {
      id: session.user?.id
    },
    select: {
      is_admin: true
    }
  })

  return {
    props: {
      isAdmin: result?.is_admin
    }
  }
}
