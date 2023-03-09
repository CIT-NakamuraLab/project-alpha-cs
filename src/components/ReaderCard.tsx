import React, { useRef } from 'react'
import { Edit3, Trash2 } from 'react-feather'
import { useModal } from 'react-hooks-use-modal'
import { trpc } from '../utils/trpc'

type ReaderCardProps = {
  clientId: string
  name: string
  onChangeState?: () => void
}

function ReaderCard({ clientId, name, onChangeState }: ReaderCardProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const renameMutation = trpc.reader.updateReaderName.useMutation({
    onSuccess: onChangeState
  })
  const deleteMutation = trpc.reader.deleteReader.useMutation({
    onSuccess: onChangeState
  })

  const [RenameReaderModal, openRenameModal, closeRenameModal] = useModal('__next', {
    preventScroll: true
  })

  const [DeleteReaderModal, openDeleteModal, closeDeleteModal] = useModal('__next', {
    preventScroll: true
  })

  const renameReader = () => {
    renameMutation.mutate({
      clientId: clientId,
      updatedName: inputRef.current?.value as string
    })
    closeRenameModal()
  }

  const deleteReader = () => {
    deleteMutation.mutate({
      clientId: clientId
    })
    closeDeleteModal()
  }

  return (
    <div className='space-y-7 rounded-xl bg-gray-600 px-16 py-14'>
      <span className='text-xl font-semibold text-gray-200'>{name}</span>
      <div className='flex items-center space-x-32'>
        <Edit3 onClick={openRenameModal} className='h-6 w-6 text-gray-300 hover:cursor-pointer' />
        <Trash2 onClick={openDeleteModal} className='h-6 w-6 text-gray-300 hover:cursor-pointer' />
      </div>

      <RenameReaderModal>
        <div className='space-y-10 rounded-lg bg-white px-8 py-10'>
          <h1 className='text-center text-lg font-semibold'>カードリーダー名変更</h1>
          <input
            type='text'
            ref={inputRef}
            defaultValue={name}
            className='rounded-md bg-gray-300 bg-transparent py-1 shadow-md outline-none'
          />

          <div className='flex items-center justify-between px-3 py-3'>
            <button onClick={renameReader} className='rounded-xl bg-indigo-300 px-4 py-2'>
              変更
            </button>
            <button onClick={closeRenameModal} className='rounded-xl bg-black px-4 py-2 text-white'>
              閉じる
            </button>
          </div>
        </div>
      </RenameReaderModal>

      <DeleteReaderModal>
        <div className='space-y-6 rounded-lg bg-white px-8 py-10'>
          <h1 className='text-center text-lg font-semibold'>カードリーダー削除</h1>
          <p>下記のカードリーダーを削除します</p>
          <div className='rounded-lg bg-gray-300 px-4 py-3'>
            <p>clientId: {clientId}</p>
            <p>名前: {name}</p>
          </div>

          <div className='flex items-center justify-between px-3 py-3'>
            <button onClick={deleteReader} className='rounded-xl bg-red-500 px-4 py-2'>
              削除
            </button>
            <button onClick={closeDeleteModal} className='rounded-xl bg-black px-4 py-2 text-white'>
              閉じる
            </button>
          </div>
        </div>
      </DeleteReaderModal>
    </div>
  )
}

export default ReaderCard
