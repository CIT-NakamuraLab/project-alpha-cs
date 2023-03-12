import type { GetServerSideProps } from 'next'
import { unstable_getServerSession } from 'next-auth/next'
import Head from 'next/head'
import SettingMenu, { Select } from '../components/SettingMenu'
import { authOptions } from './api/auth/[...nextauth]'
import { prisma } from '../server/db/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

function Log(props: { isAdmin: boolean }) {
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
        <title>開閉ログ</title>
      </Head>

      <SettingMenu
        select={Select.Log}
        title='開閉ログ'
        isAdmin={props.isAdmin}
        bodyElement={<div></div>}
      />
    </div>
  )
}

export default Log

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
