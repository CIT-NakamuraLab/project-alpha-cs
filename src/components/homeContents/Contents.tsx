import React from 'react'
import { Layout } from '../layout/Layout'
import { KeyImage } from './KeyImage'
import { Pickup } from './Pickup'
import { MemberCount } from './MemberCount'

export const Contents = () => {
  const G_AuthFlag = true
  return (
    <>
      {!G_AuthFlag 
        ? <div className="my-64">
            <h2 className="text-center">千葉工大のGoogleアカウントによる認証を行なってください</h2>
            <div className='mt-14 text-center'>
              <button
                className='mx-auto block h-20 w-40 rounded-full bg-black py-3 px-10 text-xs uppercase text-white hover:bg-gray-700'
              >
                <p className='text-base'>Sign In</p>
              </button>
            </div>
          </div>
        : <Layout title='Key Manage App'>
            <div className='mt-24'>
              <div className='flex justify-center items-center'>
                <KeyImage />
              </div>
              <div className='flex justify-center items-center'>
                <MemberCount />
              </div>
              <div className='flex justify-center items-center'>
                <Pickup />
              </div>
            </div>
            {/* <div className='relative flex min-h-screen w-screen select-none flex-col items-center justify-center'>
                      <p className='text-2xl'>メインメニュー</p>

                      <div className='py-5' />

                      {pickUp && <p className='text-xl text-blue-500'>名前太郎が取りに行っています...</p>}

                      <div className='m-1' />

                      <div className='py-5' />
                      {!pickUp && (
                          <button
                              className='rounded-full bg-rose-500 px-4 py-2 shadow-xl'
                              onClick={() => {
                              togglePickUp()
                              }}
                          >
                              取りに行く
                          </button>
                      )}

                      <div className='m-2' />
                      <button
                          className='rounded-full bg-indigo-500 px-4 py-2 shadow-md'
                          onClick={() => {
                              setPickUp(false)
                          }}
                      >
                          取りに行く強制解除
                      </button>
                  </div>  */}
          </Layout>
      }   
    </>
    
  )
}
