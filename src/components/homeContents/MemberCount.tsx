import React from 'react'

export const MemberCount = () => {
  const memberCount = 5
  return (
    <div className='mt-20 rounded-full border-2 border-black px-10 py-5'>
      <p>
        研究室内のメンバー：<span>{memberCount}</span>人
      </p>
    </div>
  )
}
