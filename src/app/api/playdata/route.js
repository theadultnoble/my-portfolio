import { NextResponse } from 'next/server';
import axios from 'axios';

const SPOTIFY_PLAYLIST_ID = '1s8c0X3WPWkHg7h0xKaqfw'; // Replace with your actual playlist ID
const SPOTIFY_API_URL = `https://api.spotify.com/v1/playlists/${SPOTIFY_PLAYLIST_ID}`;

export async function GET() {
  const tokenResponse = await fetch('http://localhost:3000/api/token'); 
  const { access_token } = await tokenResponse.json();

  try {
    const response = await axios.get(SPOTIFY_API_URL, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const tracks = response.data

    return NextResponse.json(tracks);
  } catch (error) {
    console.error('Error fetching playlist tracks:', error);
    return NextResponse.json({ error: 'Failed to fetch playlist tracks' }, { status: 500 });
  }
}
