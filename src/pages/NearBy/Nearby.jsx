import React from 'react'
import Logo from '../../components/Logo'
import './nearby.scss'
function Nearby() {
  return (
    <div className="nearby">
      <header>
        <Logo />
        <div>我的附近</div>
      </header>
      <div className="content">
        <div className="item">
          <div>衡陽路</div>
          <div>18,20,222,235</div>
        </div>
        <div className="item">
          <div>二二八和平公園</div>
          <div>15和平路幹線,18,22</div>
        </div>
        <div className="item">
          <div>衡陽路</div>
          <div>18,20,222,235</div>
        </div>
        <div className="item">
          <div>二二八和平公園</div>
          <div>15和平路幹線,18,22</div>
        </div>
      </div>
    </div>
  )
}

export default Nearby
