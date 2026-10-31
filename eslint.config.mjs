import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Preserve the third-party parser byte-for-byte; lint our integration instead.
  { ignores: ["src/lib/vendor/bibtex-parse-js.cjs"] },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
