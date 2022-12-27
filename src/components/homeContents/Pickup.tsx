import React from 'react'
import { useState } from 'react'


export const Pickup = () => {
  const [pickUp, setPickUp] = useState(false)
  const togglePickUp = () => {
    setPickUp(prevState => !prevState)
  }
  return <div>Pickup</div>
}
