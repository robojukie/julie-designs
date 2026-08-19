import { NextResponse } from "next/server";
import { Resend } from "resend";

// Make sure this variable matches your Vercel Dashboard key exactly
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { page, location, sessionId } = body;

    // 1. SWAP FROM ADDRESS: Use onboarding@resend.dev to bypass domain check blockers
    // 2. SWAP TO ADDRESS: This MUST be the exact email you used to register on Resend!
    const { data, error } = await resend.emails.send({
      from: "Tracking <onboarding@resend.dev>",
      to: ["juliespaik@gmail.com"],
      subject: `🚨 New Arrival: ${location}`,
      html: `
        <h2>New Session Started</h2>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Landing Page:</strong> <code>${page}</code></p>
        <p><strong>Session ID:</strong> <code>${sessionId}</code></p>
      `,
    });

    if (error) {
      // This will force the error out of Vercel's silence and display it directly
      console.error("❌ RESEND TRANSACTION FAILED:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error("💥 ROUTE CRASHED:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
