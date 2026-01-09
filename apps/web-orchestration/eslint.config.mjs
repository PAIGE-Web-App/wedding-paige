import eslint from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintConfigPrettier from "eslint-config-prettier";

import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const workspaceRoot = dirname(__filename);

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommended,

  globalIgnores([
    "node_modules/",
    "dist/",
    "scripts/",
    "**/*.d.ts",
    "**/dist/**",
    "apps/**/node_modules/",
  ]),

  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: workspaceRoot,
        
      },
    },
  },

  eslintConfigPrettier,
  eslintPluginPrettierRecommended
);
