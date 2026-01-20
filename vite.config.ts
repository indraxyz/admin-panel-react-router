import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
// import preserveDirectives from "rollup-plugin-preserve-directives"

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  // build: {
    // sourcemap: false,
    // rollupOptions: {
    //   output: {
    //     preserveModules: true,
    //   },
      // onwarn(warning, warn) {
      //   if (
      //     warning.code === "SOURCEMAP_ERROR" ||
      //     warning.message?.includes("Can't resolve original location") ||
      //     warning.message?.includes("sourcemap")
      //   ) {
      //     return;
      //   }
      //   warn(warning);
      // },
    // },
  // },
});
