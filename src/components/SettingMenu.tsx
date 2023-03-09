import Link from 'next/link'
import React, { type ReactNode } from 'react'
import { TbX } from 'react-icons/tb'

export enum Select {
  Log = 'Log',
  Reader = 'Reader',
  User = 'User',
  Profile = 'Profile'
}

function SettingMenu({
  select,
  title,
  bodyElement
}: {
  select: Select
  title: string
  bodyElement: ReactNode
}) {
  const isAdmin = true

  return (
    <div>
      <Link href='/'>
        <TbX className='absolute top-5 right-5 h-10 w-10 cursor-pointer hover:shadow-2xl' />
      </Link>
      <div className='flex max-md:min-h-screen max-md:flex-col md:flex-col-reverse'>
        <div className='flex-grow text-center max-md:mt-20'>
          <p className='mb-5 text-2xl font-medium text-gray-600'>{title}</p>
          {bodyElement}
        </div>
        <div className='max-md:mb-5 md:mt-6 md:mb-10'>
          <div className='flex flex-row items-center justify-center space-x-7 bg-white py-3 text-lg font-semibold decoration-2 underline-offset-8 max-md:fixed max-md:bottom-0 max-md:left-0 max-md:right-0 max-md:z-30'>
            {isAdmin && (
              <Link
                href='/log'
                className={
                  select == Select.Log
                    ? 'text-gray-800 underline'
                    : 'text-gray-400 hover:text-gray-600'
                }
              >
                ログ
              </Link>
            )}
            {isAdmin && (
              <Link
                href='/settings/reader'
                className={
                  select == Select.Reader
                    ? 'text-gray-800 underline'
                    : 'text-gray-400 hover:text-gray-600'
                }
              >
                リーダー
              </Link>
            )}
            {isAdmin && (
              <Link
                href='/settings/user'
                className={
                  select == Select.User
                    ? 'text-gray-800 underline'
                    : 'text-gray-400 hover:text-gray-600'
                }
              >
                ユーザー
              </Link>
            )}

            <Link
              href='/settings/profile'
              className={
                select == Select.Profile
                  ? 'text-gray-800 underline'
                  : 'text-gray-400 hover:text-gray-600'
              }
            >
              プロファイル
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingMenu
