import React, { useState } from 'react'
import wheelchair from './images/wheelchair.png'
import Loading from '../../components/Loading'
import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
  InfoBox,
} from '@react-google-maps/api'
function Map({ data, displayDataIndex }) {
  const [loading, setLoading] = useState(false)


  if (loading) {
    return <Loading />
  }

  return (
    <div className="map">
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_KEY}>
        <GoogleMap
          mapContainerStyle={{
            width: '100%',
            height: '100%',
          }}
          center={{
            lat: data[displayDataIndex]?.Stops[0]?.StopPosition?.PositionLat,
            lng: data[displayDataIndex]?.Stops[0]?.StopPosition?.PositionLon,
          }}
          zoom={13}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          {data[displayDataIndex]?.Stops.map((item, index) => {
            const position = {
              lat: item.StopPosition.PositionLat,
              lng: item.StopPosition.PositionLon,
            }
            return (
              <InfoBox
                key={index}
                options={{ closeBoxURL: '', enableEventPropagation: true }}
                position={position}
              >
                <div className="mapIcon">{index + 1}</div>
              </InfoBox>
            )
          })}
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default Map
