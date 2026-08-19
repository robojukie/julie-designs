import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!,
);

export async function POST(request: Request) {
  try {
    const { sessionId, location, path } = await request.json();

    // Insert the click event into your free database
    const { error } = await supabase
      .from("visitor_logs")
      .insert([{ session_id: sessionId, location, path }]);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Database logging failed:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
