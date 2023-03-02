import type { GetServerSideProps } from 'next'
import { oAuth2Client, scope } from '../utils/google'
import { signIn, useSession } from 'next-auth/react'
import { createContext, useState } from 'react'
import { GeneralButton } from '../components/GeneralButton'
import { Contents } from '../components/homeContents/Contents'
import { prisma } from '../server/db/client'
import type { User, Log } from '@prisma/client'

export const HasKeyContext = createContext(
  {} as {
    hasKey: boolean
    setHasKey: React.Dispatch<React.SetStateAction<boolean>>
  }
)

export default function Home({
  authUrl,
  users,
  logs
}: {
  authUrl: string
  users: User[]
  logs: Log[]
}) {
  const { data: session, status } = useSession()
  const [hasKey, setHasKey] = useState(false)
  if (session && status == 'authenticated') {
    console.log(session)
  }
  const slackSignIn = () => {
    signIn('slack')
  }

  return (
    <main className='relative'>
      {session ? (
        <HasKeyContext.Provider value={{ hasKey, setHasKey }}>
          <Contents authUrl={authUrl} users={users} logs={logs} />
        </HasKeyContext.Provider>
      ) : (
        <div className='flex h-screen items-center justify-center py-64'>
          <div>
            <h2 className='mx-16 text-center text-xl'>
              研究室のSlackアカウントで認証を行なってください
            </h2>
            <div className='mt-14 text-center'>
              <GeneralButton label='SIGN IN' clickFunction={slackSignIn} />
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scope
  })
  const users: User[] = await prisma.user.findMany()
  const logs: Log[] = JSON.parse(JSON.stringify(await prisma.log.findMany()))
  return {
    props: {
      authUrl,
      users,
      logs
    }
  }
}
