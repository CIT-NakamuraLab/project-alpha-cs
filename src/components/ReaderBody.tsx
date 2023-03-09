import React, { useEffect, useRef, useState } from 'react'
import { Plus } from 'react-feather'
import { useModal } from 'react-hooks-use-modal'
import { trpc } from '../utils/trpc'
import GeneralDivider from './GeneralDivider'
import ReaderCard from './ReaderCard'

type Reader = {
  client_id: string
  name: string
}

type AddReaderResponse = {
  name: string
  client_id: string
  client_token: string
}

function ReaderBody() {
  const { data, isLoading, refetch } = trpc.reader.showReaders.useQuery()
  const [readers, setReaders] = useState<Reader[]>([])
  const label = isLoading ? 'カードリーダー: 取得中...' : `カードリーダー: ${data?.length}台`

  const [newReader, setNewReader] = useState<AddReaderResponse>()

  const [AddReaderModal, openAddReaderModal, closeAddReaderModal] = useModal('__next', {
    preventScroll: true
  })

  const [NewReaderModal, openNewReaderModal, closeNewReaderModal] = useModal('__next', {
    preventScroll: true
  })

  const addReaderMutation = trpc.reader.registerReader.useMutation({
    onSuccess: data => {
      refetch()
      setNewReader({
        name: data.name,
        client_id: data.client_id,
        client_token: data.client_token
      })
      openNewReaderModal()
    }
  })

  const addReader = () => {
    addReaderMutation.mutate({
      name: inputRef.current?.value as string
    })
    closeAddReaderModal()
  }

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (data !== undefined) {
      setReaders(data)
    }
  }, [data])

  return (
    <div>
      <GeneralDivider label={label} />

      <div className='flex justify-center'>
        <div className='space-y-5'>
          {readers.map(reader => (
            <ReaderCard
              key={reader.client_id}
              clientId={reader.client_id}
              name={reader.name}
              onChangeState={() => {
                refetch()
              }}
            />
          ))}
        </div>
      </div>

      <AddReaderModal>
        <div className='space-y-10 rounded-lg bg-white px-8 py-10'>
          <h1 className='text-center text-lg font-semibold'>カードリーダー追加</h1>
          <input
            type='text'
            ref={inputRef}
            className='rounded-md bg-gray-300 bg-transparent py-1 shadow-md outline-none'
          />

          <div className='flex items-center justify-between px-3 py-3'>
            <button onClick={addReader} className='rounded-xl bg-indigo-300 px-4 py-2'>
              追加
            </button>
            <button
              onClick={closeAddReaderModal}
              className='rounded-xl bg-black px-4 py-2 text-white'
            >
              閉じる
            </button>
          </div>
        </div>
      </AddReaderModal>

      <NewReaderModal>
        <div className='space-y-10 rounded-lg bg-white px-8 py-10 text-center'>
          <h1 className='text-center text-lg font-semibold'>カードリーダー追加完了</h1>
          <p className='text-md text-center font-semibold'>新しいカードリーダーが追加されました</p>
          <div className='space-y-3'>
            <p className='rounded-lg bg-gray-300 px-3 py-1 text-start'>
              リーダー名: {newReader?.name}
            </p>
            <p className='rounded-lg bg-gray-300 px-3 py-3 text-start'>
              client_id: {newReader?.client_id}
            </p>
            <p className='rounded-lg bg-gray-300 px-3 py-3 text-start'>
              client_token: {newReader?.client_token}
            </p>
          </div>

          <button
            onClick={closeNewReaderModal}
            className='rounded-xl bg-black px-4 py-2 text-white'
          >
            閉じる
          </button>
        </div>
      </NewReaderModal>

      <Plus
        className='fixed bottom-20 right-14 h-14 w-14 rounded-full bg-black p-2 text-white shadow-xl hover:cursor-pointer max-md:bottom-20 max-md:right-14'
        onClick={openAddReaderModal}
      />
    </div>
  )
}

export default ReaderBody
