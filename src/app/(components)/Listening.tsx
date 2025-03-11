'use client';
import React from 'react';
import { useEffect } from 'react';
import WebPlayBack from './WebPlayBack';

export default function Listening() {


  const [accessToken, setAccessToken] = React.useState(null);

  useEffect(() => {
    async function getAccessToken() {
      try {
        const response = await fetch('/api/token');
        const data = await response.json();
        setAccessToken(data.access_token);
      } catch (error) {
        console.error('This is my Error:', error);
      }
    }
    getAccessToken();
  }, []);

  return (
    <div className='overflow-auto'>
      {(accessToken !== null && accessToken !== undefined
) ? <WebPlayBack access_token={accessToken} /> : 'No access token' }
    </div>
  )
}
