export const REJECT_EVENT_IDS = [
  "flee",
  "shakeToast",
] as const;

export type RejectEventId = (typeof REJECT_EVENT_IDS)[number];

export type PointerPos = { x: number; y: number };

export type RejectEventApi = {
  runFlee: (pointer?: PointerPos) => boolean;
  playShakeToast: () => void;
};

/** Picks one event id uniformly at random. Easy to extend the registry list. */
export function pickRandomEvent(
  ids: readonly RejectEventId[] = REJECT_EVENT_IDS
): RejectEventId {
  return ids[Math.floor(Math.random() * ids.length)] ?? ids[0];
}

export function runRejectEvent(
  id: RejectEventId,
  api: RejectEventApi,
  pointer?: PointerPos
): boolean {
  switch (id) {
    case "flee":
      return api.runFlee(pointer);
    case "shakeToast":
      api.playShakeToast();
      return true;
  }
}
