import Head from 'next/head'
import SettingMenu, { Select } from '../components/SettingMenu'

function log() {
  return (
    <div>
      <Head>
        <title>開閉ログ</title>
      </Head>

      <SettingMenu select={Select.Log} title='開閉ログ' bodyElement={<div></div>} />
    </div>
  )
}

export default log
