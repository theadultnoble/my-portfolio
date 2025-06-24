"use client";
import React from "react";
import useSWR from "swr";
import WebPlayBack from "./WebPlayBack";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Listening() {
  // Use SWR for access token and tracks
  const { data: tokenData, error: tokenError } = useSWR("/api/token", fetcher, {
    refreshInterval: 55 * 60 * 1000,
  }); // refresh every 55min
  const { data: tracks, error: tracksError } = useSWR("/api/playdata", fetcher);

  if (tokenError || tracksError) {
    return <div>Error loading Spotify data.</div>;
  }

  if (!tokenData || !tracks) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-auto">
      {tokenData.access_token ? (
        <WebPlayBack access_token={tokenData.access_token} trackS={tracks} />
      ) : (
        "No access token"
      )}
    </div>
  );
}
