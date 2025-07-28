import { NextResponse } from "next/server";
import axios from "axios";

const SPOTIFY_PLAYLIST_ID = "76Xa7jErorQFcZkrCJZDzz";
const SPOTIFY_API_URL = `https://api.spotify.com/v1/playlists/${SPOTIFY_PLAYLIST_ID}/tracks`;

export async function GET(request) {
  try {
    const tokenUrl = new URL("/api/token", request.url).toString();
    const tokenResponse = await fetch(tokenUrl);

    if (!tokenResponse.ok) {
      const errorBody = await tokenResponse.json();
      console.error("Error fetching access token:", errorBody);
      return NextResponse.json(
        { error: "Failed to fetch access token" },
        { status: tokenResponse.status }
      );
    }

    const { access_token } = await tokenResponse.json();

    if (!access_token) {
      return NextResponse.json(
        { error: "Missing access token" },
        { status: 500 }
      );
    }

    const response = await axios.get(SPOTIFY_API_URL, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching playlist tracks:", error.response ? error.response.data : error.message);
    return NextResponse.json(
      { error: "Failed to fetch playlist tracks" },
      { status: 500 }
    );
  }
}
