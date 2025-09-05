import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  const body = await req.json(); // { id, name, date, image }
  const filePath = path.join(process.cwd(), "data", "events.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const updatedData = data.map((ev: any) => (ev.id === body.id ? { ...ev, ...body } : ev));

  fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2), "utf-8");

  return NextResponse.json({ success: true, updatedData });
}
