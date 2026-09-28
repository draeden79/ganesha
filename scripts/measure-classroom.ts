import { gzipSync } from "node:zlib";
import { performance } from "node:perf_hooks";
import { loadClassroomCourse } from "../tests/course-fixture";
import { isLocale } from "../src/lib/course-schema";
import { flattenSteps, newProgress, restoreProgressWithStatus, updateStep } from "../src/lib/progress";

const requested = process.argv.find(value => value.startsWith("--locales="))?.split("=")[1].split(",") ?? ["pt-BR", "en"];
for (const locale of requested) {
  if (!isLocale(locale)) throw new Error(`Unsupported locale: ${locale}`);
  const course = loadClassroomCourse(locale);
  const json = JSON.stringify(course);
  let stress = newProgress(course);
  // Synthetic in-memory stress only: no browser storage or learner credits are written.
  for (const tool of ["claude", "codex"] as const) {
    stress.tool = tool;
    for (const { step } of flattenSteps(course)) {
      const answer = step.check?.correctChoiceId ?? "Synthetic performance fixture. ".repeat(34).slice(0, 1000);
      const criteria = step.practice?.criteria.map((_, index) => index) ?? [];
      const attempts = step.check || step.practice ? Array.from({ length: 50 }, (_, index) => ({ answer, passed: true, at: new Date(Date.UTC(2026, 8, 28, 0, 0, index)).toISOString(), criteria, evaluator: step.check ? "deterministic" as const : "self-report" as const })) : [];
      stress = updateStep(stress, step.id, { draft: answer, criteria, attempts, complete: true });
    }
  }
  const serialized = JSON.stringify(stress);
  const start = performance.now();
  const restored = restoreProgressWithStatus(serialized, course);
  const restoreMs = performance.now() - start;
  if (restored.status !== "restored") throw new Error(`Stress restore changed valid state: ${restored.status}`);
  console.log(JSON.stringify({ locale, version: course.version, lessons: course.lessons.length, steps: flattenSteps(course).length, courseJsonBytes: Buffer.byteLength(json), courseGzipBytes: gzipSync(json).length, syntheticProgressBytes: Buffer.byteLength(serialized), syntheticUtf16Bytes: serialized.length * 2, restoreMs: Number(restoreMs.toFixed(2)) }));
}
