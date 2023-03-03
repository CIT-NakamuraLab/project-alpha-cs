import React from 'react'
import { trpc } from '../../utils/trpc'

export const MemberCount = () => {
  const activeUsers = trpc.log.getActiveUsers.useQuery()
  return (
    <div className='mt-20 rounded-full border-2 border-black px-10 py-5'>
      <p>
        研究室内のメンバー：<span>{activeUsers.data?.length}</span>人
      </p>
    </div>
  )
}
