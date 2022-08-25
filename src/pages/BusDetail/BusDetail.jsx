import './busDetail.scss'
import { axiosData } from '../../api/getAuthorizationHeader'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import map from './images/map.png'
import time from './images/time.png'
import Back from '../../components/Back'
import Logo from '../../components/Logo'
import Content from './Content'
import Map from './Map'

function BusDetail() {
  const [data, setData] = useState([])
  const { routeName, city } = useParams()
  const [fromAndTo, setFromAndTo] = useState({ from: '', to: '' })
  const [displayDataIndex, setDisplayedDataIndex] = useState(0)
  const [displayStatus, setDisplayStatus] = useState('map')

  function handleTo(index) {
    if (displayDataIndex !== index) {
      setDisplayedDataIndex(index)
    }
  }

  useEffect(() => {
    ;(async function () {
      await axiosData(
        `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/${city}/${encodeURIComponent(
          routeName
        )}?%24top=30&%24format=JSON`,
        (data) => {
          setFromAndTo({
            from: data[0].DepartureStopNameZh,
            to: data[0].DestinationStopNameZh,
          })
        }
      )
      await axiosData(
        `https://ptx.transportdata.tw/MOTC/v2/Bus/DisplayStopOfRoute/City/${city}/${encodeURIComponent(
          routeName
        )}?%24format=JSON`,
        async (data) => {
          await axiosData(
            `https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/${city}/${encodeURIComponent(
              routeName
            )}?%24format=JSON`,
            (secondData) => {
              const newData = data.map((item) => {
                item.Stops = item.Stops.map((stop) => {
                  const newStop = secondData.find(
                    (item) => item.StopUID === stop.StopUID
                  )
                  return newStop === undefined ? stop : newStop
                })
                return item
              })
              setData(newData)
            }
          )
        }
      )
    })()

    // eslint-disable-next-line
  }, [])
  return (
    <div className="busDetail" style={{ height: `${window.innerHeight}px` }}>
      <header>
        <div className="top">
          <Back />
          <Logo />
          <img
            onClick={() => {
              let newStatus
              if (displayStatus === 'content') {
                newStatus = 'map'
              } else {
                newStatus = 'content'
              }
              setDisplayStatus(newStatus)
            }}
            src={displayStatus === 'content' ? map : time}
            alt=""
          />
        </div>
        <div className="bottom">
          <div
            onClick={() => {
              handleTo(0)
            }}
            className={displayDataIndex === 0 ? 'active' : ''}
          >
            <span>往</span>
            {fromAndTo.from}
          </div>
          <div
            onClick={() => {
              handleTo(1)
            }}
            className={displayDataIndex === 1 ? 'active' : ''}
          >
            <span>往</span>
            {fromAndTo.to}
          </div>
        </div>
      </header>
      {displayStatus === 'content' && (
        <Content data={data} displayDataIndex={displayDataIndex} />
      )}
      {displayStatus === 'map' && (
        <Map data={data} displayDataIndex={displayDataIndex} />
      )}
    </div>
  )
}

export default BusDetail
