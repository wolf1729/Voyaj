import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,
  {
    rules: {
      "no-unused-vars": "error",
      "no-console": "error",
      "no-debugger": "error",
      "prefer-const": "error",
      "eqeqeq": ["error", "always"],
      "no-var": "error",
      "react/no-unescaped-entities": "error",
      "@next/next/no-img-element": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
    "coverage/**",
  ]),
]);

export default eslintConfig;
