import type { GetServerSideProps } from 'next'
import { unstable_getServerSession } from 'next-auth/next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import SettingMenu, { Select } from '../../components/SettingMenu'
import { UserBody } from '../../components/UserBody'
import { prisma } from '../../server/db/client'
import { authOptions } from '../api/auth/[...nextauth]'

function User(props: { isAdmin: boolean }) {
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
        <title>ユーザー管理</title>
      </Head>

      <SettingMenu
        select={Select.User}
        title='ユーザー管理'
        isAdmin={props.isAdmin}
        bodyElement={<UserBody />}
      />
    </div>
  )
}

export default User

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

  if (!result?.is_admin) {
    return {
      redirect: {
        statusCode: 302,
        destination: '/'
      }
    }
  }

  return {
    props: {
      isAdmin: result?.is_admin
    }
  }
}
