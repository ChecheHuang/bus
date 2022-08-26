import React from 'react'
import Lottie from 'lottie-react'
import Bus_loading from '../BUS_loading.json'

function Loading() {
  const style = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    height: '70px',
  }
  return (
    <div style={style}>
      <Lottie animationData={Bus_loading} loop={true} />
    </div>
  )
}

export default Loading
