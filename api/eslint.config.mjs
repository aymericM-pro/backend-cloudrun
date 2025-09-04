import baseConfig from "../eslint.config.mjs";
import security from "eslint-plugin-security";
import promise from "eslint-plugin-promise";

export default [
    ...baseConfig,
    {
        files: ["**/*.ts", "**/*.js"],
        plugins: {
            security,
            promise,
        },
        rules: {
            "security/detect-object-injection": "warn",
            "security/detect-non-literal-fs-filename": "warn",
            "promise/always-return": "warn",
            "promise/no-return-wrap": "error",
            "promise/param-names": "error",
            "promise/catch-or-return": "warn",
            "no-console": ["warn", { allow: ["warn", "error"] }],
            "consistent-return": "warn",
            "callback-return": ["warn", ["next"]],
            "no-throw-literal": "error",
            "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
        },
    },
];
