import Link from 'next/link'
import React, { type ReactNode } from 'react'
import { TbX } from 'react-icons/tb'

export enum Select {
  Log = "Log",
  Reader = "Reader",
  User = "User",
  Profile = "Profile"
}

function SettingMenu({select, title, bodyElement}: {select: Select, title: string, bodyElement: ReactNode}) {

  const isAdmin = true

  return (

    <div>
      <Link href="/"><TbX className='absolute top-5 right-5 h-10 w-10 cursor-pointer hover:shadow-2xl' /></Link>
      <div className='flex max-md:flex-col md:flex-col-reverse max-md:min-h-screen'>
        <div className='flex-grow text-center max-md:mt-20'>
          <p className='text-2xl font-medium text-gray-600 mb-5'>{title}</p>
          {bodyElement}
        </div>
        <div className='max-md:mb-5 md:mt-6 md:mb-10'>
          <div className='flex flex-row items-center justify-center space-x-7 font-semibold text-lg underline-offset-8 decoration-2'>
            {isAdmin && <Link href="/log" className={select == Select.Log ? "underline text-green-600" : "text-gray-400 hover:text-gray-600"}>ログ</Link>}
            {isAdmin && <Link href="/settings/reader" className={select == Select.Reader ? "underline text-green-600" : "text-gray-400 hover:text-gray-600"}>リーダー</Link>}
            {isAdmin && <Link href="/settings/user" className={select == Select.User ? "underline text-green-600" : "text-gray-400 hover:text-gray-600"}>ユーザー</Link>}

            <Link href="/settings/profile" className={select == Select.Profile ? "underline text-green-600" : "text-gray-400 hover:text-gray-600"}>プロファイル</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingMenu