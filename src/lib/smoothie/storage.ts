import type { DashboardState } from "./types"
import defaults from "../../data/smoothie-defaults.json"

const STATE_FILE = "smoothie-state.json"
const BLOB_STORE = "smoothie"
const BLOB_KEY = "state"

function cloneDefaults(): DashboardState {
  return JSON.parse(JSON.stringify(defaults)) as DashboardState
}

async function readFromFs(): Promise<DashboardState> {
  const { readFile } = await import("node:fs/promises")
  const path = await import("node:path")
  const file = path.resolve(process.cwd(), STATE_FILE)
  try {
    const raw = await readFile(file, "utf8")
    return JSON.parse(raw) as DashboardState
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      const seed = cloneDefaults()
      await writeToFs(seed)
      return seed
    }
    throw err
  }
}

async function writeToFs(state: DashboardState): Promise<void> {
  const { writeFile, rename } = await import("node:fs/promises")
  const path = await import("node:path")
  const file = path.resolve(process.cwd(), STATE_FILE)
  const tmp = file + ".tmp"
  await writeFile(tmp, JSON.stringify(state, null, 2), "utf8")
  await rename(tmp, file)
}

async function readFromBlobs(): Promise<DashboardState> {
  const { getStore } = await import("@netlify/blobs")
  const store = getStore(BLOB_STORE)
  const data = await store.get(BLOB_KEY, { type: "json" })
  if (!data) {
    const seed = cloneDefaults()
    await store.setJSON(BLOB_KEY, seed)
    return seed
  }
  return data as DashboardState
}

async function writeToBlobs(state: DashboardState): Promise<void> {
  const { getStore } = await import("@netlify/blobs")
  const store = getStore(BLOB_STORE)
  await store.setJSON(BLOB_KEY, state)
}

function shouldUseBlobs(): boolean {
  return !import.meta.env.DEV
}

export async function readState(): Promise<DashboardState> {
  return shouldUseBlobs() ? readFromBlobs() : readFromFs()
}

export async function writeState(state: DashboardState): Promise<void> {
  return shouldUseBlobs() ? writeToBlobs(state) : writeToFs(state)
}

export function getDefaults(): DashboardState {
  return cloneDefaults()
}
