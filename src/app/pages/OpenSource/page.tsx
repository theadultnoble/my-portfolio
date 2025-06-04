import React from "react";
import ClientOpenSource from "./ClientOpenSource";
import { sanityFetch } from "@/sanity/live";
import { OPEN_SOURCE_QUERY } from "@/sanity/queries";

async function page() {
  const { data: openSource } = await sanityFetch({
    query: OPEN_SOURCE_QUERY,
  });
  if (!openSource) {
    return <div>Loading...</div>;
  }
  return <ClientOpenSource openSource={openSource} />;
}

export default page;
