import Head from 'next/head'
import SettingMenu, { Select } from '../../components/SettingMenu'
import { signOut } from 'next-auth/react'

function profile() {
  return (
    <div>
      <Head>
        <title>プロファイル設定</title>
      </Head>

      <SettingMenu 
        select={Select.Profile} 
        title='プロファイル設定' 
        bodyElement={
          <div className='mt-40 text-center'>
            <button
              onClick={() => {
                signOut({callbackUrl: "https://localhost:3000"})
              }}
              className='mx-auto block h-20 w-40 rounded-full bg-black py-3 px-10 text-xs uppercase text-white hover:bg-gray-700'
            >
              <p className='text-base'>Sign Out</p>
            </button>
          </div>
        } 
      />
    </div>
  )
}

export default profile
