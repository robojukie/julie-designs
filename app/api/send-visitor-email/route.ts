import { NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend with your environment variable API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { page, location } = body;

    // Send the tracking alert email
    const { data, error } = await resend.emails.send({
      from: "Tracking <hello@juliepaik.com>", // Replace with your Resend verified domain
      to: ["juliespaik@gmail.com"], // Replace with your personal inbox address
      subject: `新 Visitor Alert: ${location}`,
      html: `
        <h2>New Website Visit Captured</h2>
        <p><strong>Location Details:</strong> ${location}</p>
        <p><strong>Page Visited:</strong> <code>${page}</code></p>
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error("API Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
