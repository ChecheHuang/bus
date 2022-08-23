import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from './images/logo.png'

export default function Logo() {
  const navigate = useNavigate()
  function handleBack() {
    navigate('/')
  }
  return <img onClick={handleBack} src={logo} alt="" />
}
