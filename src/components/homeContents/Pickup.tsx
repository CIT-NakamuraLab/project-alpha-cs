import React from 'react'
import { useSession } from 'next-auth/react'
import { useState, useContext } from 'react'
import { HasKeyContext } from '../../pages'

//このページでやりたいことは、「鍵を取りに行くボタン」を押した人の情報をどこかに格納する処理とそれを取得して表示する処理
export const Pickup = () => {
  const session = useSession()
  const [pickUp, setPickUp] = useState(false)
  const togglePickUp = () => {
    setPickUp(prevState => !prevState)
  }
  const { hasKey } = useContext(HasKeyContext)
  const userName = 'ooさん' //何かしらから取得した現在取りに行っている人の名前
  const myAccountName = session.data?.user?.name

  return (
    <>
      {!hasKey && (
        <div className='mt-10 text-center'>
          {!pickUp ? (
            <button
              className='focus:pointer rounded-full bg-black px-10 py-5 shadow-xl hover:bg-gray-600'
              onClick={() => {
                togglePickUp()
              }}
            >
              <p className='text-white'>取りに行く</p>
            </button>
          ) : (
            <h3>
              <span>{userName}</span>が鍵を取りに行っています...
            </h3>
          )}

          <div />

          {pickUp && userName === myAccountName && (
            <button
              className='focus:pointer mt-5 rounded-full bg-black px-10 py-5 shadow-xl hover:bg-gray-600'
              onClick={() => {
                togglePickUp()
              }}
            >
              <p className='text-white'>キャンセル</p>
            </button>
          )}
        </div>
      )}
    </>
  )
}
