import React from 'react'
import { useNavigate } from 'react-router-dom'
import back from './images/back.png'

export default function Back() {
  const navigate = useNavigate()
  function handleBack() {
    navigate(-1)
  }
  return <img onClick={handleBack} src={back} alt="" />
}
