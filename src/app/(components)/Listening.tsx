'use client';
import React from 'react';
import { useEffect, useState } from 'react';

export default function Listening() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    console.log('Listening component mounted'); // Check if the component is mounted
    async function fetchData() {
      console.log('Fetching token...'); // Check if useEffect is running
      try {
        const response = await fetch('/api/token');
        console.log('Response received:', response); // Check if the response is received
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        setToken(data.access_token);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchData();
  }, []);
  return <div className='overflow-auto'>Spotify Token: {token ? token : '..loading token'}</div>;
}
