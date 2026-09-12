import { CONTENT } from "@/content";
import { buildCurriculum, chaptersOf, type Unit, type Chapter } from "@/engine/curriculum";

/** The syllabus, built once from the content bank. */
export const CURRICULUM: Unit[] = buildCurriculum(CONTENT);

export const CHAPTERS: Chapter[] = chaptersOf(CURRICULUM);

const BY_ID = new Map(CURRICULUM.map((u) => [u.id, u]));

export function unitById(id: string | null | undefined): Unit | null {
  return id ? (BY_ID.get(id) ?? null) : null;
}

export const TOTAL_EXERCISES = CURRICULUM.reduce((a, u) => a + u.total, 0);
