import { NextResponse } from "next/server";
import axios from "axios";

const SPOTIFY_PLAYLIST_ID = "76Xa7jErorQFcZkrCJZDzz";
const SPOTIFY_API_URL = `https://api.spotify.com/v1/playlists/${SPOTIFY_PLAYLIST_ID}/tracks`;

export async function GET(request) {
  const tokenUrl = new URL("/api/token", request.url).toString();
  const tokenResponse = await fetch(tokenUrl);
  const { access_token } = await tokenResponse.json();

  try {
    const response = await axios.get(SPOTIFY_API_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const tracks = response.data;

    return NextResponse.json(tracks);
  } catch (error) {
    console.error("Error fetching playlist tracks:", error);
    return NextResponse.json(
      { error: "Failed to fetch playlist tracks" },
      { status: 500 }
    );
  }
}
