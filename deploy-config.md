# Deployment Configuration for GitHub Pages

When deploying to GitHub Pages, you'll need to make these changes in your GitHub repository after pushing:

## 1. Create a new vite.config.deploy.ts file in your repository:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// This is a simplified configuration for GitHub Pages deployment
export default defineConfig({
  base: '/Front-end-weather-/',
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
});
```

## 2. Update your GitHub workflow file (.github/workflows/deploy.yml):

Before the build step, add a step to rename the config file:

```yaml
- name: Prepare for build
  run: |
    cp vite.config.deploy.ts vite.config.ts
```

## 3. Enable GitHub Pages in your repository:

1. Go to your repository settings
2. Navigate to "Pages" in the sidebar
3. Under "Source", select "GitHub Actions"
4. Make sure your repository has the necessary permissions:
   - Go to Settings > Actions > General
   - Under "Workflow permissions", select "Read and write permissions"