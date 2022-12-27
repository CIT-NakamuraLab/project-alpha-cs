import React from 'react'
import { useState, useContext } from 'react'
import { HasKeyContext } from '../../pages'


export const Pickup = () => {
  const [pickUp, setPickUp] = useState(false)
  const togglePickUp = () => {
    setPickUp(prevState => !prevState)
  }
  const {hasKey} = useContext(HasKeyContext)
  const userName = "〇〇さん"
  const myAccountName = "〇〇さん"

  return (
    <>
      {!hasKey && (
        <div className="mt-10 text-center">
        {!pickUp ? (
            <button
              className="rounded-full bg-black px-10 py-5 shadow-xl focus:pointer hover:bg-gray-600"
              onClick={() => {
                togglePickUp()
              }}
            >
              <p className="text-white">取りに行く</p>
            </button>
          )
          : (
            <h3><span>{userName}</span>が鍵を取りに行っています...</h3>
          )
        }

        <div />

        {(pickUp && userName === myAccountName) && (
          <button
            className="rounded-full mt-5 px-10 py-5 bg-black shadow-xl focus:pointer hover:bg-gray-600"
            onClick={() => {
              togglePickUp()
            }}
          >
            <p className="text-white">キャンセル</p>
          </button>
        )}
      </div>
      )}
      
    </>
    
  )
}
