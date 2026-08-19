import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Fallback values prevent Next.js from throwing build-time compilation errors
const supabaseUrl = process.env.SUPABASE_URL || "https://supabase.co";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "placeholder-key";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request: Request) {
  try {
    const { sessionId, location, path } = await request.json();

    // Prevent executing if variables aren't loaded correctly
    if (!process.env.SUPABASE_URL) {
      console.error("Missing Supabase Environment Variables");
      return NextResponse.json(
        { error: "Database unconfigured" },
        { status: 500 },
      );
    }

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
