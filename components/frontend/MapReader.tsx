import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';

function MapReader() {
  const position = {lat: 61.2176, lng: -149.8997};

  return (
    <APIProvider apiKey={'YOUR_API_KEY'}>
      <Map center={position} zoom={10}>
        <Marker position={position} />
      </Map>
    </APIProvider>
  );
}

export default MapReader;