import { NextRequest, NextResponse } from "next/server";
import { TrackClient, RegionUS, RegionEU } from "customerio-node";

// Customer.io Tracking Client
// Hesabın EU bölgesindeyse RegionEU, aksi halde RegionUS kullan
const cio = new TrackClient(
  process.env.CUSTOMERIO_SITE_ID!,
  process.env.CUSTOMERIO_API_KEY!,
  { region: RegionUS }
);

export async function POST(req: NextRequest) {
  try {
    const { name, email, reason } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const firstName = name ? name.trim().split(" ")[0] : "there";

    // 1. Kullanıcıyı Customer.io profili olarak kaydet/güncelle
    await cio.identify(cleanEmail, {
      email: cleanEmail,
      first_name: firstName,
      full_name: name ? name.trim() : "",
      use_case: reason || "",
      created_at: Math.floor(Date.now() / 1000),
      source: "website_waitlist",
    });

    // 2. Waitlist event'ini ateşle (Otomatik maili bu tetikleyecek)
    await cio.track(cleanEmail, {
      name: "joined_waitlist",
      data: {
        first_name: firstName,
        reason: reason || "",
        registered_at: new Date().toISOString(),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Successfully added to waitlist.",
    });
  } catch (err: any) {
    console.error("Waitlist API unexpected error:", err);
    return NextResponse.json(
      { error: err.message || "An unexpected error occurred." },
      { status: 500 }
    );
  }
}