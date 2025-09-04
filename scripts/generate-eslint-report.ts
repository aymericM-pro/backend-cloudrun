import { ESLint } from "eslint";
import fs from "fs/promises";

async function main() {
    const eslint = new ESLint({
        overrideConfigFile: "api/eslint.config.mjs",
        cwd: process.cwd(),
    });

    const results = await eslint.lintFiles(["api/src/**/*.{ts,js}"]);

    const json = JSON.stringify(results, null, 2);
    await fs.writeFile("eslint-report.json", json, "utf-8");

    console.log("✅ ESLint report generated → eslint-report.json");
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
