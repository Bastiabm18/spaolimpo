// src/components/Map.tsx
'use client';

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface MapProps {
  position: [number, number];
}

export default function Map({ position }: MapProps) {
  const [isClient, setIsClient] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  // Estado para guardar nuestro ícono personalizado
  const [customIcon, setCustomIcon] = useState<L.Icon | null>(null);

  // Este efecto se ejecuta solo una vez en el cliente después del montaje inicial.
  useEffect(() => {
    // Creamos el ícono personalizado usando el favicon.ico de la carpeta /public
    const icon = new L.Icon({
      iconUrl: '/favicon.ico', // Ruta al ícono en la carpeta public
      iconSize: [35, 35],      // Tamaño del ícono [ancho, alto]
      iconAnchor: [17, 35],    // Punto del ícono que corresponderá a la ubicación del marcador
      popupAnchor: [0, -35],   // Punto desde donde se abrirá el popup, relativo al iconAnchor
    });
    setCustomIcon(icon);
    
    // Marcamos que estamos en el cliente para permitir que el mapa se renderice.
    setIsClient(true);
  }, []);

  // Este efecto detecta si el tema oscuro está activado.
  useEffect(() => {
    if (!isClient) return;

    const checkTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, [isClient]);

  // --- Configuración de Mapbox ---
  const accessToken = 'pk.eyJ1IjoiYXZlZ2FwNDEiLCJhIjoiY2tibWtpdGttMGl1NjJybjhjNTVxaGtpcyJ9.dLbDgSiWkdlq8SyzhREO7A';
  const mapboxAttribution = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
  const mapStyleId =  'mapbox/navigation-night-v1' ;
  const tileUrl = `https://api.mapbox.com/styles/v1/${mapStyleId}/tiles/{z}/{x}/{y}?access_token=${accessToken}`;

  // Evitamos el renderizado hasta que estemos en el cliente y el ícono esté listo.
  if (!isClient || !customIcon) {
    return null;
  }

  return (
    <MapContainer
      center={position}
      zoom={15}
      scrollWheelZoom={false}
      className="w-full h-full"
    >
      <TileLayer
        key={mapStyleId} // La 'key' fuerza la recarga de la capa al cambiar de tema.
        attribution={mapboxAttribution}
        url={tileUrl}
        tileSize={512}
        zoomOffset={-1}
      />
      {/* Usamos el ícono personalizado en el componente Marker */}
      <Marker position={position} icon={customIcon}>
        <Popup>
            <a href='https://maps.app.goo.gl/fFaPM8zeu84oCgJw6'>
          Click Aca!. <br /> ¡Te esperamos!
            </a>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
