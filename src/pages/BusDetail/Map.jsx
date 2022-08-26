import React, { useState } from 'react'
import mapBus from './images/mapBus.png'
import { mapStyle, polylineStyle } from './mapStyle'
import Loading from '../../components/Loading'
import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
  InfoBox,
} from '@react-google-maps/api'
import { useEffect } from 'react'
function Map({ data, displayDataIndex }) {
  const [paths, setPaths] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    let paths = []
    for (let stop of data[displayDataIndex].Stops) {
      const path = {
        lat: stop.StopPosition.PositionLat,
        lng: stop.StopPosition.PositionLon,
      }
      paths = [...paths, path]
    }
    setPaths(paths)
  }, [data[displayDataIndex]])
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
            background: 'black',
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
            styles: mapStyle,
          }}
        >
          <Polyline path={paths} options={polylineStyle} />
          <Marker
            position={{
              lat: data[displayDataIndex]?.Stops[0]?.StopPosition?.PositionLat,
              lng: data[displayDataIndex]?.Stops[0]?.StopPosition?.PositionLon,
            }}
            icon={{
              url: mapBus,
            }}
          />

          {data[displayDataIndex]?.Stops.map((stop, index) => {
            const position = {
              lat: stop.StopPosition.PositionLat,
              lng: stop.StopPosition.PositionLon,
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
