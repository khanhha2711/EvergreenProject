"use server";

import { location } from "@/service/locationService";

export async function getLocation(query) {
  if (!query) return [];
  try {
    return await location(query);
  } catch (error) {
    console.error(error);
    return [];
  }
}
