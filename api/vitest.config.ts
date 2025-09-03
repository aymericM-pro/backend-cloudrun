import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        include: ["tests/**/*.{test,spec}.{ts,tsx}"],
        exclude: ["node_modules", "dist", ".nx", "coverage"],
        environment: "node",
        reporters: ["default"],
        coverage: {
            provider: "v8",
            reportsDirectory: "./coverage",
            reporter: ["text", "lcov", "json-summary"],
            all: true,
            include: ["src/**/*.ts"],
            exclude: ["src/**/*.d.ts", "src/**/__mocks__/**"],
        },
    },
});
