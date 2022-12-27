import Head from 'next/head'
import SettingMenu, { Select } from '../../components/SettingMenu'
import {UserBody} from "../../components/UserBody"

function user() {
  return (
    <div>
      <Head>
        <title>ユーザー管理</title>
      </Head>

      <SettingMenu select={Select.User} title='ユーザー管理' bodyElement={<UserBody />} />
    </div>
  )
}

export default user
