import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tasks = await import("../../../../../public/data/tasks.json").catch(() => ({ default: [] }));
    const scheduled = await import("../../../../../public/data/scheduled.json").catch(() => ({ default: [] }));
    const agents = await import("../../../../../public/data/agents.json").catch(() => ({ default: [] }));

    return NextResponse.json({
      tasks: tasks.default || [],
      scheduled: scheduled.default || [],
      agents: agents.default || [],
    });
  } catch (e) {
    return NextResponse.json({ tasks: [], scheduled: [], agents: [] });
  }
}
