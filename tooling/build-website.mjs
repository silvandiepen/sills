import { spawnSync } from "node:child_process";

const result = spawnSync("npm", ["run", "build", "--workspace", "web"], {
  encoding: "utf8",
  stdio: "inherit",
});

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}
