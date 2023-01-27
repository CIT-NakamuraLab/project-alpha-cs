import React from 'react'
import Image from 'next/image'
import { GeneralButton } from '../components/GeneralButton'

const googleAuthResult = () => {
  const authFlag = true

  return (
    <>
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

              <table className='m-auto mt-8 w-64 border-l-4 border-black'>
                <tbody>
                  <tr>
                    <th className='w-32 pl-2 text-left align-top'>学籍番号:</th>
                    <td>2032xxx</td>
                  </tr>
                  <tr>
                    <th className='w-32 pl-2 text-left align-top'>氏名:</th>
                    <td>田中太郎</td>
                  </tr>
                </tbody>
              </table>
            </>
          ) : (
            <>
              <div className='flex justify-center'>
                <Image src={'/images/badmark.png'} alt='ばつ印の画像' width={100} height={100} />
              </div>
              <p className='mt-10 text-center text-3xl'>登録が失敗しました</p>
              <table className='mt-8 ml-12 w-80 border-l-4 border-black sm:w-auto'>
                <tbody>
                  <tr>
                    <th className='w-32 pl-2 text-left align-top'>ステータス:</th>
                    <td>Error</td>
                  </tr>
                  <tr>
                    <th className='w-32 pl-2 text-left align-top'>メッセージ:</th>
                    <td>Unsupported account type</td>
                  </tr>
                </tbody>
              </table>
            </>
          )}
          <div className='my-12'>
            <GeneralButton label={'閉じる'} clickFunction={() => console.log('close')} />
          </div>
        </div>
      </div>
    </>
  )
}

export default googleAuthResult
