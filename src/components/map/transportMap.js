"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

// SSR safe
const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false },
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false },
);
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), {
  ssr: false,
});
const Polyline = dynamic(
  () => import("react-leaflet").then((m) => m.Polyline),
  { ssr: false },
);
const Popup = dynamic(() => import("react-leaflet").then((m) => m.Popup), {
  ssr: false,
});
const Tooltip = dynamic(() => import("react-leaflet").then((m) => m.Tooltip), {
  ssr: false,
});
const Circle = dynamic(() => import("react-leaflet").then((m) => m.Circle), {
  ssr: false,
});

// ================= HELPER =================

// snap vào route
function getNearestPointOnRoute(route, point) {
  let minDist = Infinity;
  let nearest = route[0];

  route.forEach((p) => {
    const dist = Math.pow(p[0] - point[0], 2) + Math.pow(p[1] - point[1], 2);

    if (dist < minDist) {
      minDist = dist;
      nearest = p;
    }
  });

  return nearest;
}
function createNumberIcon(color, number) {
  const L = require("leaflet");

  return new L.DivIcon({
    className: "",
    html: `
      <div style="
        position:relative;
        width:40px;
        height:40px;
      ">

        <!-- PIN -->
        <div style="
          width:40px;
          height:40px;
          background:${color};
          border-radius:50% 50% 50% 0;
          transform:rotate(-45deg);
          box-shadow:0 3px 8px rgba(0,0,0,0.25);
          display:flex;
          align-items:center;
          justify-content:center;
        ">
        </div>

        <!-- NUMBER -->
        <div style="
          position:absolute;
          top:50%;
          left:50%;
          transform:translate(-50%, -50%);
          color:white;
          font-weight:700;
          font-size:13px;
        ">
          ${number}
        </div>

      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
}
export default function TransportMap({ location }) {
  const [points, setPoints] = useState(null);
  const [route, setRoute] = useState([]);
  const [trucks, setTrucks] = useState([]);
  const [icons, setIcons] = useState({});

  useEffect(() => {
    const startIcon = createNumberIcon("#3b82f6", 1);
    const middleIcon = createNumberIcon("#f59e0b", 2);
    const endIcon = createNumberIcon("#ef4444", 3);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIcons({
      start: startIcon,
      middle: middleIcon,
      end: endIcon,
    });
  }, []);

  useEffect(() => {
    const L = require("leaflet");

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    });
  }, []);

  // LOAD ROUTE
  useEffect(() => {
    if (!location?.length) return;

    const item = location[0];

    const start = [item.latiCom, item.lonCom];
    const middle = [item.latiCus, item.lonCus];
    const end = [item.latiOrigin, item.lonOrigin];

    const fetchRoute = async () => {
      const url = `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${middle[1]},${middle[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`;

      const res = await fetch(url);
      const data = await res.json();

      const coords = data.routes[0].geometry.coordinates;

      const latlngs = coords.map(([lng, lat]) => [lat, lng]);

      setRoute(latlngs);

      setPoints({
        start,
        middle,
        end,
        names: {
          start: item.companyAddress,
          middle: item.customerAddress,
          end: item.origin,
        },
      });
    };

    fetchRoute();
  }, [location]);

  // LOAD TRUCKS
  useEffect(() => {
    if (!location?.length) return;

    const data = location.map((item) => ({
      licensePlate: item.licensePlate,
      driverName: "Tài xế",
      lat: item.latiNow,
      lng: item.lonNow,
    }));

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTrucks(() => {
      return data.map((t) => {
        const raw = [t.lat, t.lng];

        const snapped =
          route.length > 0 ? getNearestPointOnRoute(route, raw) : raw;

        return {
          ...t,
          position: snapped,
        };
      });
    });
  }, [location, route]);

  if (!points) return null;

  return (
    <MapContainer
      center={points.start}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {/* route */}
      {route.length > 0 && <Polyline positions={route} />}

      <Marker position={points.start} icon={icons.start}>
        <Tooltip permanent>{points.names.start}</Tooltip>
      </Marker>

      <Marker position={points.middle} icon={icons.middle}>
        <Tooltip permanent>{points.names.middle}</Tooltip>
      </Marker>

      <Marker position={points.end} icon={icons.end}>
        <Tooltip permanent>{points.names.end}</Tooltip>
      </Marker>

      {trucks.map((truck) => (
        <>
          <Circle
            center={truck.position}
            radius={2000}
            pathOptions={{
              color: "#3b82f6", 
              fillColor: "#3b82f6",
              fillOpacity: 0.06,
              weight: 0,
            }}
          />

          <Circle
            center={truck.position}
            radius={1000}
            pathOptions={{
              color: "#3b82f6",
              fillColor: "#3b82f6",
              fillOpacity: 0.15,
              weight: 0,
            }}
          />

          <Circle
            center={truck.position}
            radius={200}
            pathOptions={{
              color: "#1d4ed8",
              fillColor: "#1d4ed8",
              fillOpacity: 1,
              weight: 0,
            }}
          >
            <Tooltip
              permanent
              direction="top"
              offset={[0, -8]}
              opacity={1}
              className="truck-label"
            >
              {truck.licensePlate}
            </Tooltip>
          </Circle>
        </>
      ))}
    </MapContainer>
  );
}
