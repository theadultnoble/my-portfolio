'use client';

import React, { useEffect, useRef, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import { Icon } from '@iconify/react';

export default function Location() {
  const [isLoading, setIsLoading] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

    if (!mapContainerRef.current) return;

    try {
      setIsLoading(true);
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [7.5213265209659745, 6.44144482630189],
        zoom: 12,
        attributionControl: false,
        // interactive: false
      });

      mapRef.current.addControl(
        new mapboxgl.NavigationControl({
          showZoom: false,
          showCompass: false,
          visualizePitch: false,
        }),
        'top-right'
      );

      mapRef.current.on('load', () => {
        setIsLoading(false);
      });
    } catch (error) {
      console.error('Error initializing map:', error);
      setIsLoading(false);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div className='relative w-full h-full'>
      <div
        ref={mapContainerRef}
        className='absolute inset-0 rounded-lg w-full h-full '
      ></div>
      {isLoading && (
        <div className='absolute inset-0 flex items-center justify-center'>
          Loading map...
        </div>
      )}
      <div className='absolute top-1 left-1'>
        <p className='flex items-center gap-1 px-1 bg-[#E9E8E6] rounded-3xl border border-[#DBDAD6] w-fit text-xxs font-medium'>
          <Icon
            icon='stash:pin-location'
            style={{ color: '#727270' }}
            width={12}
          />
          Location
        </p>
      </div>
    </div>
  );
}
