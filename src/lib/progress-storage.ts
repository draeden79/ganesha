import type { Course } from "./course-schema";
import { mergeProgress, restoreProgressWithStatus, storageKey, type Progress } from "./progress";

export interface ProgressStorage { getItem(key: string): string | null; setItem(key: string, value: string): void }

/** Failed/over-quota saves retain the in-memory draft and never delete existing records. */
export function saveLocalProgress(storage: ProgressStorage, course: Course, local: Progress) {
  let progress = local;
  let recovered = false;
  try {
    const key = storageKey(course);
    const raw = storage.getItem(key);
    const remote = restoreProgressWithStatus(raw, course);
    if (raw && ["corrupt", "incompatible", "recovered"].includes(remote.status)) {
      storage.setItem(`${key}:recovery:${Date.now()}`, raw);
      recovered = true;
    }
    progress = mergeProgress(local, remote.progress, course);
    storage.setItem(key, JSON.stringify(progress));
    return { saved: true, progress, recovered };
  } catch {
    return { saved: false, progress, recovered };
  }
}
