import { defineConfig } from "orval";

export default defineConfig({
  "api-file": {
    input: {
      target: "../backend/api.yaml",
    },
    output: {
      mode: "tags",
      target: "src/api/default.ts",
      schemas: "src/types/api",
      prettier: true,
      override: {
        mutator: {
          path: "src/lib/api-client.ts",
          name: "customInstance",
        },
      },
    },
  },
});
