import { useSession } from 'next-auth/react'
import { SigninButton } from '../components/SignInButton'
import { Contents } from '../components/homeContents/Contents'

export default function Home() {
  const { data: session, status } = useSession()

  if (session && status == 'authenticated') {
    console.log(session)
  }
  return (
    <main className='relative'>
      {session ? (
        <Contents />
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
