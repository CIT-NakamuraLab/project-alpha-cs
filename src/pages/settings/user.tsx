import Head from 'next/head'
import React from 'react'
import SettingMenu, { Select } from '../../components/SettingMenu'

function user() {
  return (
    <div>
      <Head>
        <title>ユーザー管理</title>
      </Head>

      <SettingMenu select={Select.User} title="ユーザー管理" bodyElement={<div></div>} />
    </div>
  )
}

export default user