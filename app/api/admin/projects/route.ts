import { NextResponse, type NextRequest } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { isAuthorizedAdmin } from "@/lib/adminAuth";
import { invalidateProjectsCache } from "@/lib/projects";

export async function GET(request: NextRequest) {
  if (!(await isAuthorizedAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = await getDatabase();
  const docs = await db.collection("Projects").find({}).toArray();
  docs.sort((a, b) => Number(a.project_id || 0) - Number(b.project_id || 0));

  return NextResponse.json(
    docs.map((doc) => ({ ...doc, _id: doc._id.toString() })),
  );
}

export async function POST(request: NextRequest) {
  if (!(await isAuthorizedAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { title, desc, project_id, project_type } = body;
  if (!title || !desc || !project_id || !project_type) {
    return NextResponse.json(
      { error: "title, desc, project_id and project_type are required" },
      { status: 400 },
    );
  }

  const db = await getDatabase();
  const result = await db.collection("Projects").insertOne({
    title,
    desc,
    project_id: String(project_id),
    project_type,
    technologies: body.technologies ?? [],
    img: body.img ?? [],
    sitelink: body.sitelink ?? "",
    codelink: body.codelink ?? "",
    isHidden: body.isHidden === true,
  });

  invalidateProjectsCache();
  return NextResponse.json({ _id: result.insertedId.toString() }, { status: 201 });
}
