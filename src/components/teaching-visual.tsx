import type { Step } from "@/lib/course-schema";

const paths = {
  page: "M5 3h10l4 4v14H5zM14 3v5h5M8 12h8M8 16h6",
  context: "M9 4h6v5H9zM3 15h6v5H3zM15 15h6v5h-6zM12 9v3M6 15v-3h12v3",
  check: "M20 11v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10M9 11l4 4L22 5",
  speech: "M21 4H3v13h5l4 4v-4h9zM7 8h10M7 12h7",
};
function Symbol({ kind }: { kind: keyof typeof paths }) { return <svg width="31" height="31" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[kind]} /></svg>; }
export function TeachingVisual({ step }: { step: Step }) {
  if (!step.visualDescription) return null;
  if (step.id === "step.first-request.request-check") return null; // The three answer cards are the teaching visual.
  // Exact stable IDs select composition; localized text is never parsed or embedded in images.
  const isTransfer = step.id === "step.first-request.transfer";
  const isEvidence = step.id === "step.first-request.evidence-check";
  if (step.practice && !isTransfer && step.executionMode !== "external-real-task") return null; // The rubric itself supplies the visual cards.
  return <figure className={`teaching-visual ${isEvidence ? "evidence-visual" : ""}`}>
    <div className="visual-nodes" aria-hidden="true">
      <span className="visual-node"><Symbol kind={isEvidence ? "speech" : "page"} /></span><span className="visual-connector">→</span>
      {isTransfer ? <div className="visual-destinations"><bdi>Claude</bdi><bdi>Codex</bdi></div> : <><span className={`visual-node ${isEvidence ? "unverified" : ""}`}><Symbol kind={isEvidence ? "page" : "context"} /></span>{!isEvidence && <><span className="visual-connector">→</span><span className="visual-node"><Symbol kind="check" /></span></>}</>}
    </div><figcaption>{step.visualDescription}</figcaption>
  </figure>;
}
