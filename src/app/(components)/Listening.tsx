'use client';
import React from 'react';
import { useEffect } from 'react';
import WebPlayBack from './WebPlayBack';
// import useSWR from 'swr';

export default function Listening() {


  const [accessToken, setAccessToken] = React.useState(null);
  const [tracks, setTracks] = React.useState()

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
    async function fetchTracks() {
      try {
        const response = await fetch('/api/playdata');
        const data = await response.json();
        setTracks(data);
      } catch (error) {
        console.error('Error fetching tracks:', error);
      }
    }
    fetchTracks();
    getAccessToken();
  }, []);

  console.log(tracks)

  return (
    <div className='overflow-auto'>
      {(accessToken !== null && accessToken !== undefined
        ) ? <WebPlayBack access_token={accessToken} trackS = {tracks}/> : 'No access token' }
    </div>
  )
}
