import { defineConfig } from "vite";
// import mendix from "@engalar/vite-plugin-mendix";
import mendix from "./node_modules/@engalar/vite-plugin-mendix/src";
// @ts-ignore
import pkg from "./package.json";

export default defineConfig({
    plugins: [
        mendix({ widgetName: pkg.widgetName, widgetPackage: pkg.packagePath, testProject: pkg.config.projectPath })
    ],
    build: {
        outDir: "dist2",
        lib: {
            entry: {
                AddressFinder: "src/AddressFinder.tsx"
                // "AddressFinder.editorConfig": "src/AddressFinder.editorConfig.ts"
                // "AddressFinder.editorPreview": "src/AddressFinder.editorPreview.tsx"
            },
            name: "AddressFinder",
            formats: ["umd"],
            // formats: ["cjs"],
            fileName: (_format, entryName) => `${entryName}.js`
        },
        rollupOptions: {
            treeshake: true,
            perf: true,
            output: {
                format: "amd"
            },
            external: [
                // "mendix" and internals under "mendix/"
                /^mendix($|\/)/,

                // "react"
                /^react$/,

                // "react/jsx-runtime"
                /^react\/jsx-runtime$/,

                // "react-dom"
                /^react-dom$/,
                /^big.js$/
            ]
        }
    }
});
