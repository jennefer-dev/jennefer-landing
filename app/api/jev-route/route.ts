import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { AgentClass } from '@/lib/tasks';

// Cache file path
const CACHE_FILE = path.join(process.cwd(), 'data', 'decisions.json');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { taskId, title } = body;

    if (!taskId || !title) {
      return NextResponse.json({ error: 'Missing taskId or title' }, { status: 400 });
    }

    // Always serve from local decisions cache
    let cachedData: Record<string, { agent: AgentClass, reason: string }> = {};
    try {
      const fileContent = await fs.readFile(CACHE_FILE, 'utf-8');
      cachedData = JSON.parse(fileContent);
    } catch (e) {
      return NextResponse.json({ error: 'Cache file missing or corrupted' }, { status: 500 });
    }

    if (cachedData[taskId]) {
      // Small artificial delay to mimic local engine processing speed if desired,
      // but serving instantly is fine too.
      return NextResponse.json({
        cached: true,
        agent: cachedData[taskId].agent,
        reason: cachedData[taskId].reason,
      });
    }

    return NextResponse.json({ error: `Task ${taskId} not found in deterministic engine cache.` }, { status: 404 });
  } catch (error: unknown) {
    console.error("Routing error:", error);
    const msg = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
