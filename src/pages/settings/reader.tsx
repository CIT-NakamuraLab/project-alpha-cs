import Head from 'next/head'
import ReaderBody from '../../components/ReaderBody'
import SettingMenu, { Select } from '../../components/SettingMenu'

function reader() {
  return (
    <div>
      <Head>
        <title>カードリーダー管理</title>
      </Head>

      <SettingMenu select={Select.Reader} title='カードリーダー管理' bodyElement={<ReaderBody />} />
    </div>
  )
}

export default reader
