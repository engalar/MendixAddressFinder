import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Inspect from "vite-plugin-inspect";
import mendix from "@engalar/vite-plugin-mendix";
// @ts-ignore
import pkg from "./package.json";

export default defineConfig({
    plugins: [Inspect(), react(), mendix({ widgetName: pkg.widgetName })]
});
