export type ModalTone = "navy" | "green" | "magenta" | "blue"

/** Page brand colours for shared modals; anything unlisted uses the main MployUs navy. */
const VIEW_TONES: Record<string, ModalTone> = {
  "locum-provision": "green",
  "web-development": "green",
  "recruitment-service": "magenta",
  "care-management": "blue",
}

export function getModalTone(view: string): ModalTone {
  return Object.prototype.hasOwnProperty.call(VIEW_TONES, view) ? VIEW_TONES[view] : "navy"
}
