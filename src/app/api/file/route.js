// app/api/file/route.js

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get("path");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${path}`,
    {
      method: "GET",
    }
  );

  const blob = await res.arrayBuffer();

  return new Response(blob, {
    headers: {
      "Content-Type": res.headers.get("content-type") || "application/pdf",
    },
  });
}