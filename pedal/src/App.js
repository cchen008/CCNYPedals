import React from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiY2NoZW4wMDgiLCJhIjoiY2s2NnYxN29wMWFjOTNvbzhmaDY3ZGxyYyJ9.VJqAlOFb4jz7AnbhadcuDQ';
const someData = [
  {
    "bike_id":"7f5a4199-4f9d-490d-8ac2-2565ba501fe7",
    "lat":38.895802,
    "lon":-77.006593,},
  {
    "bike_id":"b675160c-306c-4ed6-99b8-b94fa3269cc2",
    "lat":38.903634,
    "lon":-77.026413,},
  {
    "bike_id":"c0f3eed4-6e48-4755-b5b7-303c42f475bb",
    "lat":38.90307,
    "lon":-77.043318,},
  {
    "bike_id":"c1d509e7-ac19-43c4-a1e3-54623e0cb9d8",
    "lat":38.900236,
    "lon":-77.01053,},
];

var setUserLocation = () => {
  navigator.geolocation.getCurrentPosition(position => {
     let setUserLocation = {
         lat: position.coords.latitude,
         long: position.coords.longitude
      };
     let newViewport = {
        height: "100vh",
        width: "100vw",
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        zoom: 12
      };
      this.setState({
        viewport: newViewport,
        userLocation: setUserLocation
     });
  });
};


export default function App() {

  const state = {
    viewport: {
      latitude: 38.9072,
      longitude: -77,
      width: "100vw",
      height: "100vh",
      zoom: 12
    },
    userLocation: {}
  };

  return (
    <div>
      <ReactMapGL
        {...state.viewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/cchen008/ck6fhdne30sjb1iqvxge9w504"
        onViewportChange={viewport => 
          setUserLocation.setState( { viewport } ) }      
      >
        {someData.map(bird => (
          <Marker 
            key={bird.bike_id}
            latitude={bird.lat}
            longitude={bird.lon}
          >
            <button>
              <img src="https://cdn0.iconfinder.com/data/icons/bicycle-19/64/road-bike-bicycle-bike-riding-512.png" height={20} width={20} alt = "bike markers"></img>
            </button>
          </Marker>
        ))}
        <Form style={{width:400}} >
          <Form.Group controlId="formDestination">
            <Form.Control type="text" placeholder="Enter your location" />
          </Form.Group>
          <Form.Group controlId="formDestination">
            <Form.Control type="text" placeholder="Enter your destination" />
            <Button>
              Search
            </Button>
          </Form.Group>
        </Form>
      </ReactMapGL>
    </div>
  );
}