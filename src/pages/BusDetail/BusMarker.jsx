import React from 'react'
import { Marker } from '@react-google-maps/api'
import mapBus from './images/mapBus.png'

function BusMarker({ stops }) {
  return (
    <>
      {stops.map((stop, index) => {
        const { StopPosition, EstimateTime, Direction } = stop
        if (EstimateTime < 180 && Direction === 1) {
          console.log(StopPosition)

          return (
            <Marker
              key={index}
              position={{
                lat: StopPosition.PositionLat,
                lng: StopPosition.PositionLon,
              }}
              icon={{
                url: mapBus,
              }}
            />
          )
        } else {
          return false
        }
      })}
    </>
  )
}

export default BusMarker
