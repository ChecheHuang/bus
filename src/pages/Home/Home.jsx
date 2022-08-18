import React from 'react'
import './home.scss'
import taiwanBus from './taiwanBus.png'
import routeImg from './routeImg.png'
import circle from './circle.png'
import searchIcon from './searchIcon.png'
import gpsIcon from './gpsIcon.png'
import { Link } from 'react-router-dom'
function Home() {
  return (
    <div className="home">
      <div className="contain">
        <img className="logoImg" src={taiwanBus} alt="" />
        <div className="route">
          <img className="routeImg" src={routeImg} alt="" />
          <img className="circle img1" src={circle} alt="" />
          <img className="circle img2" src={circle} alt="" />
          <img className="circle img3" src={circle} alt="" />
          <Link to="nearbyBus">
            <button className="button1">
              <img src={gpsIcon} alt="" />
              附近公車站
            </button>
          </Link>
          <Link to="searchBus">
            <button className="button2">
              <img src={searchIcon} alt="" />
              查詢公車
            </button>
          </Link>
          <Link to="searchPTB">
            <button className="button3">
              <img src={searchIcon} alt="" />
              查詢客運
            </button>
          </Link>
        </div>
      </div>
      <footer>Taiwan Bus &copy;Code:Carl / Design:KT</footer>
    </div>
  )
}

export default Home
