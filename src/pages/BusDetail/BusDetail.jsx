import './busDetail.scss'
import { axiosData } from '../../api/getAuthorizationHeader'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import map from './images/map.png'
import wheelchair from './images/wheelchair.png'
import Back from '../../components/Back'
import Logo from '../../components/Logo'
import { current } from '@reduxjs/toolkit'

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
              console.log(data)
              console.log(secondData)
              const newData = data.map((item) => {
                item.Stops = item.Stops.map((stop) => {
                  const newStop = secondData.find(
                    (item) => item.StopUID === stop.StopUID
                  )
                  return newStop === undefined ? stop : newStop
                })
                return item
              })
              // setData(newData)
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
          console.log(item)
          const {StopName,StopStatus}=item
          return (
            <div key={index} className="item">
              <div className="left">
                <div className="time">未發車</div>
                <div className="name">富州里</div>
              </div>
              <div className="right">
                <div className="mark">
                  <img src={wheelchair} alt="" />
                  619-U3
                </div>
                <div className="circle">
                  <div className="line"></div>
                </div>
              </div>
            </div>
          )
        })}
        <div className="item">
          <div className="left">
            <div className="time">未發車</div>
            <div className="name">富州里</div>
          </div>
          <div className="right">
            <div className="mark">
              <img src={wheelchair} alt="" />
              619-U3
            </div>
            <div className="circle">
              <div className="line"></div>
            </div>
          </div>
        </div>
        <div className="item active2">
          <div className="left">
            <div className="time">未發車</div>
            <div className="name">富州里</div>
          </div>
          <div className="right">
            <div className="mark">
              <img src={wheelchair} alt="" />
              619-U3
            </div>
            <div className="circle">
              <div className="line"></div>
            </div>
          </div>
        </div>
        <div className="item active">
          <div className="left">
            <div className="time">未發車</div>
            <div className="name">富州里</div>
          </div>
          <div className="right">
            <div className="mark">
              <img src={wheelchair} alt="" />
              619-U3
            </div>
            <div className="circle">
              <div className="line"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BusDetail
