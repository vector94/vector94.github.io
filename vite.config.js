import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        // Function form so only these packages are pinned; everything
        // else (troika, three-stdlib, …) follows its importer, keeping
        // the 3D stack out of the eager entry graph.
        manualChunks(id) {
          // vite's preload helper is shared by every dynamic import;
          // keep it in the eager chunk or it drags r3f in with it
          if (id.includes('vite/preload-helper')) return 'react'
          if (!id.includes('node_modules')) return
          if (id.includes('@react-three')) return 'r3f'
          if (/node_modules\/three\//.test(id)) return 'three'
          if (id.includes('framer-motion')) return 'framer'
          if (/node_modules\/(react|react-dom|scheduler)\//.test(id)) return 'react'
        },
      },
    },
  },
})
