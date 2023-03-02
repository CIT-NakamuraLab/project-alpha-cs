import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { HasKeyContext } from '../../pages'
import type { Log, User } from '@prisma/client'
import { trpc } from '../../utils/trpc'
import { useSession } from 'next-auth/react'
import { LogType } from '../../utils/const'

export const Pickup = ({
  logs,
  users,
  student_id
}: {
  logs: Log[]
  users: User[]
  student_id: string | null | undefined
}) => {
  const { hasKey } = useContext(HasKeyContext)
  const session = useSession()
  const userName = session.data?.user?.name
  const [pickUpFlag, setPickUpFlag] = useState(false)
  const [keyPickerName, setKeyPickerName] = useState(userName)
  const addKeyPickupLogMutation = trpc.log.addKeyPickupLog.useMutation()
  const deleteKeyPickupLogMutation = trpc.log.deleteKeyPickupLog.useMutation()

  useEffect(() => {
    const pickUpLog_array = logs.filter(log => log.type === LogType.KEY_PICKUP)
    if (pickUpLog_array.length > 0) {
      setPickUpFlag(true)
      const keyPickerStudentNumber = pickUpLog_array[0]?.student_id
      if (keyPickerStudentNumber) {
        const keyPicker = users.find(user => user.student_id === keyPickerStudentNumber)
        setKeyPickerName(keyPicker?.name ? keyPicker?.name : '')
      }
    } else {
      setPickUpFlag(false)
    }
  }, [logs, users])

  const addPickUpLog = () => {
    setPickUpFlag(true)
    addKeyPickupLogMutation.mutate({ studentId: student_id! })
  }
  const delPickUpLog = () => {
    setPickUpFlag(false)
    deleteKeyPickupLogMutation.mutate()
  }

  return (
    <>
      {!hasKey && (
        <div className='mt-10 text-center'>
          {!pickUpFlag ? (
            <button
              className='focus:pointer rounded-full bg-black px-10 py-5 shadow-xl hover:bg-gray-600'
              onClick={() => {
                addPickUpLog()
              }}
            >
              <p className='text-white'>取りに行く</p>
            </button>
          ) : (
            <h3>
              <span>{keyPickerName}</span>が鍵を取りに行っています...
            </h3>
          )}

          <div />

          {pickUpFlag && userName === keyPickerName && (
            <button
              className='focus:pointer mt-5 rounded-full bg-black px-10 py-5 shadow-xl hover:bg-gray-600'
              onClick={() => {
                delPickUpLog()
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
