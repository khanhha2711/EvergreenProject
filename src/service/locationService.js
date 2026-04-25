export async function location(query) {
  if (!query) return [];

  const res = await fetch(
    `https://api.maptiler.com/geocoding/${encodeURIComponent(query)}.json?` +
      new URLSearchParams({
        key: process.env.NEXT_PUBLIC_MAPTILER_KEY,
        autocomplete: "true",
        limit: "8",
        language: "vi",
        country: "vn",
        types: "address,poi,street",
      }),
  );

  const data = await res.json();

  const unique = [
    ...new Map(
      (data.features || []).map((item) => [item.place_name, item]),
    ).values(),
  ];

  return unique;
}
