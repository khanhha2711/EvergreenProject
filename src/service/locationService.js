export async function location(query) {
  if (!query) return [];

  const res = await fetch(
    `https://api.maptiler.com/geocoding/${query}.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`,
  );
  const data = await res.json();

  return data.features || [];
}
