import React from 'react'
import wheelchair from './images/wheelchair.png'
import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
  InfoBox,
} from '@react-google-maps/api'
function Map({ data, displayDataIndex }) {
  const center = {
    lat: data[displayDataIndex]?.Stops[0]?.StopPosition?.PositionLat,
    lng: data[displayDataIndex]?.Stops[0]?.StopPosition?.PositionLon,
  }

  return (
    <div className="map">
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_KEY}>
        <GoogleMap
          mapContainerStyle={{
            width: '100%',
            height: '100%',
          }}
          center={
            center.lat !== undefined ? center : { lat: -3.745, lng: -38.523 }
          }
          zoom={18}
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
                <div className="mapIcon">1</div>
              </InfoBox>
            )
          })}
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default Map
