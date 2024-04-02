import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const rootDir = resolve(dirname(__filename), "../..");

export function getPublicFolderPath() {
  return resolve(rootDir, "public");
}
