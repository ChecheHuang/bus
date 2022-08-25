import React from 'react'
import wheelchair from './images/wheelchair.png'
import { formatSecond } from '../../config/tool'
import Time from '../../components/Time'
import { useEffect } from 'react'

export default function Content({ data, displayDataIndex }) {
  useEffect(() => {
    document
      .querySelector('.content')
      .scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [displayDataIndex])
  return (
    <div className="content">
      <div className="remind">
        *於
        <Time />
        秒前更新
      </div>
      {data[displayDataIndex]?.Stops.map((item, index) => {
        const { StopName, StopStatus, EstimateTime, StopUID } = item
        let text = ''
        let className = 'item'
        switch (StopStatus) {
          case 0:
            if (formatSecond(EstimateTime).includes('分')) {
              text = formatSecond(EstimateTime)
              className += ' active2'
            } else {
              text = '進站中'
              className += ' active'
            }
            break
          case 1:
            text = '尚未發車'
            break
          case 2:
            text = '交管不停靠'

            break
          case 3:
            text = '末班車已過'
            break
          case 4:
            text = '今日未營運'
            break
          default:
            break
        }
        return (
          <div key={index} className={className}>
            <div className="left">
              <div className="time">{text}</div>
              <div className="name">{StopName.Zh_tw}</div>
            </div>
            <div className="right">
              <div className="mark">
                {Math.floor(Math.random() * 5) === 2 && (
                  <img src={wheelchair} alt="" />
                )}

                {StopUID}
              </div>
              <div className="circle">
                <div className="line"></div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
