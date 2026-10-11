"use client";

import { useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",

  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",

  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png"
});


export default function BusMap({
  buses = [],
  stops = []
}) {

  const mapRef = useRef(null);

  useEffect(() => {

    return () => {

      if (mapRef.current) {

        try {
          mapRef.current.remove();
        } catch (error) {
          console.log("Map cleanup:", error);
        }

        mapRef.current = null;
      }

    };

  }, []);


  const center =
    buses.length > 0
      ? [
          Number(buses[0].latitude),
          Number(buses[0].longitude)
        ]
      : [15.3647, 75.1240];


  return (

    <MapContainer
      key="campus-bus-map"
      center={center}
      zoom={14}
      style={{
        width: "100%",
        height: "500px"
      }}
      whenCreated={(map) => {
        mapRef.current = map;
      }}
    >

      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />


      {/* BUSES */}

      {buses.map((bus) => (

        <Marker
          key={`bus-${bus.id}`}
          position={[
            Number(bus.latitude),
            Number(bus.longitude)
          ]}
        >

          <Popup>

            <strong>
              🚌 {bus.busNumber}
            </strong>

            <br />

            Speed: {bus.speed} km/h

            <br />

            Capacity: {bus.capacity}

          </Popup>

        </Marker>

      ))}


      {/* STOPS */}

      {stops.map((stop) => (

        <Marker
          key={`stop-${stop.id}`}
          position={[
            Number(stop.latitude),
            Number(stop.longitude)
          ]}
        >

          <Popup>

            <strong>
              📍 {stop.name}
            </strong>

            <br />

            Students: {stop.students || 0}

          </Popup>

        </Marker>

      ))}

    </MapContainer>

  );
}
