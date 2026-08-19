import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  // 1. Verify key is loaded before initializing
  if (!process.env.RESEND_API_KEY) {
    console.error(
      "❌ CRITICAL CONFIG ERROR: RESEND_API_KEY is missing from environment variables!",
    );
    return NextResponse.json(
      { error: "Unconfigured API Key" },
      { status: 500 },
    );
  }
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const body = await request.json();
    const { page, location, sessionId } = body;

    console.log(
      `📧 API ROUTE: Attempting to dispatch Resend request for session: ${sessionId}`,
    );

    const { data, error } = await resend.emails.send({
      from: "Tracking <onboarding@resend.dev>",
      to: ["juliespaik@gmail.com"],
      subject: `🚨 New Arrival: ${location}`,
      html: `
        <h2>New Session Started</h2>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Landing Page:</strong> <code>${page}</code></p>
        <p><strong>Session ID:</strong> <code>${sessionId}</code></p>
        <p><em>Use this Session ID in your logging dashboard to track their full live click path.</em></p>
      `,
    });

    if (error) {
      console.error("Resend Internal Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    console.log(
      "✅ RESEND SUCCESS: Email successfully handed to Resend network. ID:",
      data?.id,
    );

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error("API Context Crash:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
