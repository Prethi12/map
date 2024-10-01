import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

const redIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const MapEvents = ({ markers, setMarkers }) => {
  const map = useMap();

  useMapEvents({
    click(e) {
      const latlng = e.latlng;
      const existingMarker = markers.find(marker => marker.lat === latlng.lat && marker.lng === latlng.lng);

      if (existingMarker) {
        setMarkers(markers.filter(marker => marker.lat !== latlng.lat || marker.lng !== latlng.lng));
      } else {
        if (markers.length < 2) {
          setMarkers([...markers, latlng]);
        } else {
          alert('You can only place up to 2 markers.');
        }
      }
    },
  });

  useEffect(() => {
    if (markers.length === 2) {
      const [start, end] = markers;

      let routingControl = L.Routing.control({
        waypoints: [L.latLng(start.lat, start.lng), L.latLng(end.lat, end.lng)],
        router: L.Routing.osrmv1({
          serviceUrl: 'https://router.project-osrm.org/route/v1',
        }),
        routeWhileDragging: false,
        lineOptions: {
          styles: [{ color: 'red', opacity: 0.9, weight: 6 }],
          addWaypoints: false,
        },
        show: false,
        addWaypoints: false,
      });

      routingControl.addTo(map);

      return () => {
        map.eachLayer(layer => {
          if (layer instanceof L.Routing.Control) {
            map.removeLayer(layer);
          }
        });
        routingControl.remove();
      };
    }
  }, [markers, map]);

  return null;
};

const Report = () => {
  const [markers, setMarkers] = useState([]);

  return (
    <MapContainer center={[13.0827, 80.2707]} zoom={13} scrollWheelZoom={true} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <MapEvents markers={markers} setMarkers={setMarkers} />
      {markers.map((position, idx) => (
        <Marker key={idx} position={position} icon={redIcon}>
          <Popup>
            Marker at [{position.lat.toFixed(5)}, {position.lng.toFixed(5)}]
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Report;
