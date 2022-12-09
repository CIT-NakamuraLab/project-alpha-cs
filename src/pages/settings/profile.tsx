import Head from 'next/head'
import SettingMenu, { Select } from '../../components/SettingMenu'

function profile() {
  return (
    <div>
      <Head>
        <title>プロファイル設定</title>
      </Head>

      <SettingMenu select={Select.Profile} title='プロファイル設定' bodyElement={<div></div>} />
    </div>
  )
}

export default profile
