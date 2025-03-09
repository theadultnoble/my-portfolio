import axios from 'axios';
import { NextResponse } from 'next/server';
let cachedToken = null;
let tokenExpiry = 0;
export async function GET() {
  const now = Date.now();
  if (cachedToken && now < tokenExpiry) {
    return NextResponse.json({ access_token: cachedToken });
  } else {
    const clientID = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    // console.log('Client ID:', process.env.SPOTIFY_CLIENT_ID);
    // console.log('Client Secret:', process.env.SPOTIFY_CLIENT_SECRET);

    var tokenOptions = {
      method: 'POST',
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`,
    };
    const response = await axios(tokenOptions);
    const data = response.data;
    cachedToken = data.access_token;
    tokenExpiry = now + data.expires_in * 1000;

    // console.log(cachedToken);
    return NextResponse.json({ access_token: cachedToken });
  }
}
