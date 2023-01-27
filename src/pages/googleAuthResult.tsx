import React from 'react'
import Image from 'next/image'
import { GeneralButton } from '../components/GeneralButton'

const googleAuthResult = () => {
  const authFlag=true

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div>
          {authFlag 
            ?
            <>
              <div className="flex justify-center">
                <Image src={"/images/checkmark.png"} alt="チェックマークの画像" width={100} height={77}/>
              </div>
              <p className='mt-10 text-3xl text-center'>登録が完了しました</p>
              
              <table className="border-l-4 border-black mt-8 m-auto w-64">
                <tbody>
                  <tr>
                    <th className="w-32 text-left pl-2 align-top">学籍番号:</th>
                    <td>2032xxx</td>
                  </tr>
                  <tr>
                    <th className="w-32 text-left pl-2 align-top">氏名:</th>
                    <td>田中太郎</td>
                  </tr>
                </tbody>
              </table>
            </>
             
            :
            <>
              <div className="flex justify-center">
                <Image src={"/images/badmark.png"} alt="ばつ印の画像" width={100} height={100}/>
              </div>
              <p className='mt-10 text-3xl text-center'>登録が失敗しました</p>
              <table className="border-l-4 border-black mt-8 ml-12 w-80 sm:w-auto">
                <tbody>
                  <tr>
                    <th className="w-32 text-left pl-2 align-top">ステータス:</th>
                    <td>Error</td>
                  </tr>
                  <tr>
                    <th className="w-32 text-left pl-2 align-top">メッセージ:</th>
                    <td>Unsupported account type</td>
                  </tr>
                </tbody>
              </table>
            </>
          }
          <div className="my-12">
            <GeneralButton label={"閉じる"} clickFunction={()=>console.log("close")} />
          </div>
        </div>
      </div>
    </>
  )
}

export default googleAuthResult