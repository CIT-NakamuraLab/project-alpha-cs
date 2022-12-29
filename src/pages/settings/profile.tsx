import Head from 'next/head'
import SettingMenu, { Select } from '../../components/SettingMenu'
import { signOut } from 'next-auth/react'
import { GeneralButton } from '../../components/GeneralButton'

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

export default profile
