import { getStore } from "@netlify/blobs";

export default async (req, context) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Content-Type": "application/json"
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  try {
    const store = getStore("qissa-catalog");

    if (req.method === "POST") {
      const body = await req.json();
      await store.setJSON("data", body);
      return new Response(JSON.stringify({ success: true, message: "Catalog synchronized to cloud successfully!" }), {
        status: 200,
        headers
      });
    }

    if (req.method === "GET") {
      const data = await store.get("data", { type: "json" });
      if (data) {
        return new Response(JSON.stringify(data), { status: 200, headers });
      } else {
        return new Response(JSON.stringify({ empty: true }), { status: 200, headers });
      }
    }

    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers });
  } catch (error) {
    console.error("Netlify Blobs Catalog Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers });
  }
};
