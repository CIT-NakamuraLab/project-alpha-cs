import { useSession } from 'next-auth/react'
import { createContext, useState } from 'react'
import { SigninButton } from '../components/SignInButton'
import { Contents } from '../components/homeContents/Contents'

export const HasKeyContext = createContext(
  {} as {
    hasKey: boolean
    setHasKey: React.Dispatch<React.SetStateAction<boolean>>
  }
)

export default function Home() {
  const { data: session, status } = useSession()
  const [hasKey, setHasKey] = useState(false)
  if (session && status == 'authenticated') {
    console.log(session)
  }
  return (
    <main className='relative'>
      {session ? (
        <HasKeyContext.Provider value={{ hasKey, setHasKey }}>
          <Contents />
        </HasKeyContext.Provider>
      ) : (
        <div className='flex items-center justify-center py-64'>
          <div>
            <h2>研究室のSlackアカウントによる認証を行なってください</h2>
            <SigninButton type='slack' />
          </div>
        </div>
      )}
    </main>
  )
}
