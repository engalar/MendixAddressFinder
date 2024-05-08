import { defineConfig } from "vite";
import mendix from "@engalar/vite-plugin-mendix";
// @ts-ignore
import pkg from "./package.json";

export default defineConfig({
    plugins: [
        mendix({ widgetName: pkg.widgetName, widgetPackage: pkg.packagePath, testProject: pkg.config.projectPath })
    ]
});
