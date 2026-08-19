import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { page, location, sessionId } = body;

    const { data, error } = await resend.emails.send({
      from: "Tracking <alerts@juliepaik.com>",
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

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
