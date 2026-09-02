import nextPlugin from "@next/eslint-plugin-next";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

const eslintConfig = tseslint.config(
  {
    ignores: [".next/**", "node_modules/**"],
  },
  ...tseslint.configs.recommended,
  reactHooks.configs.flat["recommended-latest"],
  {
    plugins: { "@next/next": nextPlugin },
    rules: {
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },
);

export default eslintConfig;
