import { redis } from "@/app/utilities/redis";
import axios from "axios";
import { NextResponse } from "next/server";

const TOKEN_KEY = "spotify_access_token";

export async function GET() {
  try {
    console.log("Verifying Redis credentials...");
    console.log("Upstash Redis URL:", process.env.UPSTASH_REDIS_REST_URL ? "Loaded" : "Missing");
    console.log("Upstash Redis Token:", process.env.UPSTASH_REDIS_REST_TOKEN ? "Loaded" : "Missing");

    console.log("Attempting to get token from cache...");
    let cachedToken = await redis.get(TOKEN_KEY);

    if (cachedToken) {
      console.log("Found token in cache:", cachedToken);
      return NextResponse.json({ access_token: cachedToken });
    } else {
      console.log("No token in cache. Fetching a new one from Spotify.");
      
      const clientID = process.env.SPOTIFY_CLIENT_ID;
      const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

      console.log("Spotify Client ID:", clientID ? "Loaded" : "Missing");
      console.log("Spotify Client Secret:", clientSecret ? "Loaded" : "Missing");

      if (!clientID || !clientSecret) {
        console.error("Missing Spotify client credentials in environment variables.");
        return NextResponse.json(
          { error: "Missing Spotify client credentials" },
          { status: 500 }
        );
      }

      const basicAuth = Buffer.from(`${clientID}:${clientSecret}`).toString(
        "base64"
      );

      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        "grant_type=client_credentials",
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${basicAuth}`,
          },
        }
      );

      const accessToken = response.data.access_token;
      const expiresIn = response.data.expires_in;

      console.log("New token fetched successfully:", accessToken);
      
      await redis.set(TOKEN_KEY, accessToken, { ex: expiresIn - 60 });
      console.log("New token cached in Redis.");

      return NextResponse.json({ access_token: accessToken });
    }
  } catch (error) {
    console.error("Error in /api/token:", error?.response?.data || error.message);
    return NextResponse.json(
      { error: "Failed to fetch Spotify token" },
      { status: 500 }
    );
  }
}