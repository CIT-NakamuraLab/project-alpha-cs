import React from 'react'
import Image from 'next/image'
import { GeneralButton } from '../components/GeneralButton'
import type { GetServerSideProps } from 'next'
import type { User } from '@prisma/client'
import { prisma } from '../server/db/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const GoogleAuthResult = ({ users }: { users: User[] }) => {
  const session = useSession()
  const router = useRouter()
  const user_id = session.data?.user?.id
  const myAccount = users.filter(user => user_id === user.id)
  const authFlag = myAccount[0]?.student_id ? true : false

  return (
    <div className='w-screen'>
      <div className='flex h-screen items-center justify-center'>
        <div>
          {authFlag ? (
            <>
              <div className='flex justify-center'>
                <Image
                  src={'/images/checkmark.png'}
                  alt='チェックマークの画像'
                  width={100}
                  height={77}
                />
              </div>
              <p className='mt-10 text-center text-3xl'>登録が完了しました</p>
              <div className='mt-8 border-l-4 border-black pl-2'>
                <div className='flex'>
                  <p className='w-20 text-left'>学籍番号:</p>
                  <p className='w-40 sm:w-auto'>{myAccount[0]?.student_id}</p>
                </div>
                <div className='flex pt-2'>
                  <p className='w-20 text-left'>E-mail:</p>
                  <p className='w-40 sm:w-auto'>{myAccount[0]?.email}</p>
                </div>
                <div className='flex pt-2'>
                  <p className='w-20 text-left'>氏名:</p>
                  <p className='w-40 sm:w-auto'>{myAccount[0]?.name}</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className='flex justify-center'>
                <Image src={'/images/badmark.png'} alt='ばつ印の画像' width={100} height={100} />
              </div>
              <p className='mt-10 text-center text-3xl'>登録が失敗しました</p>
              <div className='mt-8 border-l-4 border-black pl-2'>
                <div className='flex'>
                  <p className='w-24 text-left'>ステータス:</p>
                  <p className='w-40 sm:w-auto'>学籍番号取得エラー</p>
                </div>
                <div className='flex pt-2'>
                  <p className='w-24 text-left'>メッセージ:</p>
                  <p className='w-40 sm:w-auto'>学籍番号の登録に失敗しました</p>
                </div>
              </div>
            </>
          )}
          <div className='my-12'>
            <GeneralButton label={'閉じる'} clickFunction={() => router.push('/')} />
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const users: User[] = await prisma.user.findMany()
  return {
    props: {
      users
    }
  }
}

export default GoogleAuthResult
