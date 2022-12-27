import React from 'react'

export const MemberCount = () => {
  const memberCount = 5
  return (
    <div className="mt-20 border-2 rounded-full px-10 py-5 border-black">
      <p>研究室内のメンバー：<span>{memberCount}</span>人</p>
    </div>
  )
}
