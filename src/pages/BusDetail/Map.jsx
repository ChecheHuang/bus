import React from 'react'
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api'
function Map({ data, displayDataIndex }) {
  console.log(data)
  console.log(displayDataIndex)

  return (
    <div className="map">
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_KEY}>
        <GoogleMap
          mapContainerStyle={{
            width: '100%',
            height: '100%',
          }}
          center={{ lat: -3.745, lng: -38.523 }}
          zoom={18}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          {data[displayDataIndex]?.Stops.map((item, index) => {
            console.log(item)
            return (
              <Marker
                key={index}
                // position={{
                //   lat: i.StationPosition.PositionLat,
                //   lng: i.StationPosition.PositionLon,
                // }}
              />
            )
          })}
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default Map
