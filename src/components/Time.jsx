import React, { useState } from 'react'
import { useEffect } from 'react'

function Time() {
  const [time, setTime] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        return prev + 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  return <div>{time}</div>
}

export default Time
