import React,{ useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css'

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


export default function App() {
  const[viewport, setViewport] = useState({
    latitude: 38.9072,
    longitude: -77,
    width: "100vw",
    height: "100vh",
    zoom: 12
  });

  let setUserLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      let newViewport = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        height: "100vw",
        width: "100vw",
        zoom: 13,
      }
      console.log(position.coords.longitude);
      setViewport(newViewport);
    })
  };

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/cchen008/ck6fhdne30sjb1iqvxge9w504"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
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
          <Row>
            <Col>
              <Form >
                {/*
                <Form.Group controlId="formDestination">
                  <Form.Control type="text" placeholder="Enter your location" />
                </Form.Group>
                */}
                <Form.Group controlId="formDestination">
                  <Form.Control type="text" placeholder="Enter your destination" />
                </Form.Group>
              </Form>
            </Col>
            <Col>
              <Button variant="info">Search</Button>
            </Col>
            <Col>
              <Button onClick={setUserLocation} variant="light" className="my-location">
                <img src="https://icons-for-free.com/download-icon-desire+game+goal+mission+sport+target+icon-1320184914414056998_512.png" className="target"></img>
              </Button>
            </Col>
          </Row>
      </ReactMapGL>
    </div>
  );
}