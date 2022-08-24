import './busDetail.scss'
import { axiosData } from '../../api/getAuthorizationHeader'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import map from './images/map.png'
import wheelchair from './images/wheelchair.png'
import Back from '../../components/Back'
import Logo from '../../components/Logo'
import { formatSecond } from '../../config/tool'

function BusDetail() {
  const [data, setData] = useState([])
  const routeName = useParams().routeName
  const routeInfo = useSelector((state) => state.route.routeInfo)
  useEffect(() => {
    ;(async function () {
      await axiosData(
        `https://ptx.transportdata.tw/MOTC/v2/Bus/DisplayStopOfRoute/City/Taipei/${encodeURIComponent(
          routeName
        )}?%24format=JSON`,
        async (data) => {
          await axiosData(
            `https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/Taipei/${encodeURIComponent(
              routeName
            )}?%24format=JSON`,
            (secondData) => {
              // console.log(data)
              // console.log(secondData)
              const newData = data.map((item) => {
                item.Stops = item.Stops.map((stop) => {
                  const newStop = secondData.find(
                    (item) => item.StopUID === stop.StopUID
                  )
                  return newStop === undefined ? stop : newStop
                })
                return item
              })
              console.log(newData)
              setData(newData)
            }
          )
        }
      )
    })()
    // eslint-disable-next-line
  }, [])
  return (
    <div className="busDetail">
      <header>
        <div className="top">
          <Back />
          <Logo />
          <img src={map} alt="" />
        </div>
        <div className="bottom">
          <div className="active">
            <span>往</span>
            {routeInfo.route1}
          </div>
          <div className="">
            <span>往</span>
            {routeInfo.route2}
          </div>
        </div>
      </header>
      <div className="content">
        <div className="remind">*於3秒前更新</div>
        {data[0]?.Stops.map((item, index) => {
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
    </div>
  )
}

export default BusDetail
