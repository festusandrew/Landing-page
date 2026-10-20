import { rm } from "node:fs/promises"

const targets = ["dist", "server.js", ".vite"]

for (const target of targets) {
  try {
    await rm(target, { recursive: true, force: true })
  } catch (err) {
    // ignore missing targets
  }
}
