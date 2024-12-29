import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   build: {
//     target: 'es2020'
// },
// optimizeDeps: {
//     esbuildOptions : {
//         target: "es2020"
//     }
// },
//   define: {
//     global: "globalThis",
//     "process.env": {},
//   },
//   server: {
//     host: true,
//     port: 5713
//   }
// });
export default defineConfig(({ command }) => ({
  define: {
    global: (() => {
      if (command !== "build") return "globalThis";
      let globalVariable = "globalThis";
      try {
        // Try to import @safe-global/safe-apps-provider
        require.resolve("@safe-global/safe-apps-provider");
        // Try to import @safe-global/safe-apps-sdk
        require.resolve("@safe-global/safe-apps-sdk");
        // If both modules are found, return the custom global variable
        globalVariable = "global";
      } catch (e) {
        // If either module is not found, fallback to globalThis
        globalVariable = "globalThis";
      }
      return globalVariable;
    })(),
  },
  plugins: [react()],
  build: {
    target: "es2020",
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "es2020",
    },
  },
  server: {
    host: true,
    port: 5713,
  },
}));
