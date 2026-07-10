import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Project } from "@/lib/types";

const findMock = vi.fn();
const getDatabaseMock = vi.fn();

vi.mock("@/lib/mongodb", () => ({
  getDatabase: () => getDatabaseMock(),
}));

vi.mock("@/lib/projects.fallback.json", () => ({
  default: [
    doc("2", "Fallback Two"),
    doc("1", "Fallback One"),
    { ...doc("3", "Fallback Hidden"), isHidden: true },
  ],
}));

function doc(project_id: string, title: string): Project {
  return {
    _id: `id-${project_id}`,
    title,
    technologies: [],
    img: [],
    sitelink: "",
    codelink: "",
    project_id,
    desc: "",
    project_type: "business",
  };
}

function dbReturning(docs: unknown[]) {
  findMock.mockReturnValue({ toArray: async () => docs });
  getDatabaseMock.mockResolvedValue({
    collection: () => ({ find: findMock }),
  });
}

async function freshGetProjects() {
  vi.resetModules();
  const mod = await import("@/lib/projects");
  return mod.getProjects;
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe("getProjects", () => {
  it("sorts by numeric project_id ascending, not lexicographically", async () => {
    dbReturning([doc("10", "Ten"), doc("2", "Two"), doc("1", "One")]);
    const getProjects = await freshGetProjects();

    const projects = await getProjects();

    expect(projects.map((p) => p.project_id)).toEqual(["1", "2", "10"]);
  });

  it("queries with the isHidden filter", async () => {
    dbReturning([doc("1", "One")]);
    const getProjects = await freshGetProjects();

    await getProjects();

    expect(findMock).toHaveBeenCalledWith(
      { isHidden: { $ne: true } },
      expect.anything(),
    );
  });

  it("memoizes: second call within the TTL does not hit the database", async () => {
    dbReturning([doc("1", "One")]);
    const getProjects = await freshGetProjects();

    await getProjects();
    await getProjects();

    expect(getDatabaseMock).toHaveBeenCalledTimes(1);
  });

  it("falls back to the snapshot (filtered and sorted) when the DB fails", async () => {
    getDatabaseMock.mockRejectedValue(new Error("connection refused"));
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const getProjects = await freshGetProjects();

    const projects = await getProjects();

    expect(projects.map((p) => p.title)).toEqual([
      "Fallback One",
      "Fallback Two",
    ]);
    consoleError.mockRestore();
  });

  it("stringifies ObjectId-like _id values from the driver", async () => {
    dbReturning([
      { ...doc("1", "One"), _id: { toString: () => "abc123" } },
    ]);
    const getProjects = await freshGetProjects();

    const projects = await getProjects();

    expect(projects[0]._id).toBe("abc123");
  });
});
