import React from 'react'
import { GeneralButton } from '../components/GeneralButton'
import Image from 'next/image'

const Result = () => {
  const name = '田中太郎'
  const id = '2032112'
  const message = 'Need to login with slack account'
  const status = 'Unauthorized'
  const succesFlag = true

  return (
    <div className='flex justify-center'>
      <div className='relative'>
        <Image
          src='/images/chibani.jpeg'
          width={450}
          height={450}
          alt='チバニーの画像'
          className='absolute top-28 left-2/4 -z-50 -ml-56 animate-slide-top'
        />
        <div className='z-50 mx-11 mt-72 rounded-md border-4 border-black bg-white px-10 py-14'>
          <div className='mb-8 text-center'>
            {succesFlag ? (
              <>
                <p className='mb-5 text-left text-3xl font-bold'>登録が完了しました</p>
                <div className='border-l-4 border-gray-500 pl-2 text-left '>
                  <p>学籍番号：{id}</p>
                  <p>氏名：{name}</p>
                </div>
              </>
            ) : (
              <>
                <p className='mb-5 text-3xl font-bold'>登録に失敗しました</p>
                <div className='border-l-4 border-gray-500 pl-2 text-left'>
                  <p>ステータス：{status}</p>
                  <p
                    className='w-56 overflow-hidden overflow-ellipsis whitespace-nowrap hover:cursor-pointer'
                    onClick={() => alert('メッセージ：' + message)}
                  >
                    メッセージ：{message}
                  </p>
                </div>
              </>
            )}
            <p className='mb-5 text-3xl font-bold'></p>
            <div className='border-l-4 border-gray-500 pl-2 text-left '></div>
          </div>
          <GeneralButton label='close' clickFunction={() => console.log('move home')} />
        </div>
      </div>
    </div>
  )
}

export default Result
