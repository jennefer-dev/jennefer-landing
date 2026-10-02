export const WAITLIST_SEATS = 100;

export async function getWishlistCount(): Promise<number> {
  try {
    const segmentId = process.env.CUSTOMERIO_WAITLIST_SEGMENT_ID;
    const appApiKey = process.env.CUSTOMERIO_APP_API_KEY;
    if (!segmentId || !appApiKey) return 0;
    const res = await fetch(`https://api.customer.io/v1/segments/${segmentId}/customer_count`, {
      headers: { Authorization: `Bearer ${appApiKey}` }, next: { revalidate: 60 },
    });
    if (!res.ok) return 0;
    const data = await res.json();
    return typeof data.count === "number" ? data.count : 0;
  } catch { return 0; }
}

export async function getSeatsLeft(): Promise<number> {
  return Math.max(0, WAITLIST_SEATS - (await getWishlistCount()));
}
