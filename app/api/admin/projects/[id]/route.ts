import { NextResponse, type NextRequest } from "next/server";
import { ObjectId } from "mongodb";
import { getDatabase } from "@/lib/mongodb";
import { isAuthorizedAdmin } from "@/lib/adminAuth";
import { invalidateProjectsCache } from "@/lib/projects";

const EDITABLE_FIELDS = [
  "title",
  "desc",
  "project_id",
  "project_type",
  "technologies",
  "img",
  "sitelink",
  "codelink",
  "isHidden",
] as const;

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, context: RouteContext) {
  if (!(await isAuthorizedAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const body = await request.json();
  const update: Record<string, unknown> = {};
  for (const field of EDITABLE_FIELDS) {
    if (field in body) update[field] = body[field];
  }
  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
  }
  if ("project_id" in update) update.project_id = String(update.project_id);

  const db = await getDatabase();
  const result = await db
    .collection("Projects")
    .updateOne({ _id: new ObjectId(id) }, { $set: update });

  if (result.matchedCount === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  invalidateProjectsCache();
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  if (!(await isAuthorizedAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const db = await getDatabase();
  const result = await db
    .collection("Projects")
    .deleteOne({ _id: new ObjectId(id) });

  if (result.deletedCount === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  invalidateProjectsCache();
  return NextResponse.json({ ok: true });
}
