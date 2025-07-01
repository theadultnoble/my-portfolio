import { redis } from "@/app/utilities/redis";
import axios from "axios";
import { NextResponse } from "next/server";
// import { redis } from "./redis";

const TOKEN_KEY = "spotify_access_token";

export async function GET() {
  let cachedToken = await redis.get(TOKEN_KEY);

  if (cachedToken) {
    return NextResponse.json({ access_token: cachedToken });
  } else {
    const clientID = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    var tokenOptions = {
      method: "POST",
      url: "https://accounts.spotify.com/api/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`,
    };
    const response = await axios(tokenOptions);
    const cachedToken = response.data.access_token;
    console.log(cachedToken);
    const expiresIn = response.data.expires_in;
    await redis.set(TOKEN_KEY, cachedToken, { ex: expiresIn - 60 });
    return NextResponse.json({ access_token: cachedToken });
  }
}
