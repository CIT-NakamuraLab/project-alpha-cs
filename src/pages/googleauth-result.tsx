import React from 'react'
import { GeneralButton } from '../components/GeneralButton'
import Image from 'next/image'

const Result = () => {
    const name = "田中太郎"
    const id = "2032112"
    const message = "Need to login with slack account"
    const status = "Unauthorized"
    const succesFlag = true

    return (
        <div className="flex justify-center">
            <div className="relative">
                <Image src="/images/chibani.jpeg" width={450} height={450} alt="チバニーの画像" className="absolute -z-50 top-28 -ml-56 left-2/4 animate-slide-top" />
                <div className="bg-white border-black rounded-md border-4 px-10 py-14 mt-72 mx-11 z-50">
                    <div className="mb-8 text-center">
                        {
                            succesFlag 
                            ? (
                                <>
                                    <p className="text-3xl text-left font-bold mb-5">登録が完了しました</p>
                                    <div className="border-l-4 border-gray-500 text-left pl-2 ">
                                        <p>学籍番号：{id}</p>
                                        <p>氏名：{name}</p>
                                    </div>
                                </>
                            )
                            : (
                                <>
                                    <p className="text-3xl font-bold mb-5">登録に失敗しました</p>
                                    <div className="border-l-4 border-gray-500 text-left pl-2">
                                        <p>ステータス：{status}</p>
                                        <p 
                                            className="overflow-hidden overflow-ellipsis whitespace-nowrap w-56 hover:cursor-pointer"
                                            onClick={() => alert("メッセージ：" + message)}
                                        >メッセージ：{message}</p>
                                    </div>
                                </>
                            )
                        }
                        <p className="text-3xl font-bold mb-5"></p>
                        <div className="border-l-4 border-gray-500 text-left pl-2 ">
                            
                        </div>
                    </div>
                    <GeneralButton label="close" clickFunction={() => console.log("move home")} />
                </div>
            </div>
        </div>
    )
}

export default Result
