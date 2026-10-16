import { readdir } from "node:fs/promises"
import path from "node:path"
import { spawnSync } from "node:child_process"

async function findTests(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = await Promise.all(
    entries.map((entry) => {
      const filename = path.join(directory, entry.name)
      if (entry.isDirectory()) return findTests(filename)
      return entry.isFile() && /\.test\.tsx?$/.test(entry.name) ? [filename] : []
    }),
  )
  return files.flat()
}

// Resolve from this script so discovery does not depend on the caller's directory.
const root = path.resolve(import.meta.dirname, "..")
process.chdir(root)
const files = (await Promise.all(["src", "components"].map(findTests))).flat().sort()

if (files.length === 0) {
  console.error("No .test.ts or .test.tsx files found in src/ or components/.")
  process.exit(1)
}

const result = spawnSync(process.execPath, ["--import", "tsx", "--test", ...files], {
  stdio: "inherit",
})
if (result.error) console.error(result.error.message)
process.exit(result.status ?? 1)
