import { Connect, defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Inspect from "vite-plugin-inspect";
import fs from "fs";
import httpProxy from "http-proxy";
import type { ServerResponse } from "http";
const proxy = httpProxy.createProxyServer({ secure: false });

const prefixs = ["/__inspect", "/@vite", "/node_modules", "/main.ts", "/src", "/@react-refresh"];
// https://vitejs.dev/config/
// https://vitejs.dev/guide/api-plugin
export default defineConfig({
    plugins: [
        Inspect(),
        react(),
        true && {
            name: "vite-plugin-mendix",
            enforce: "pre",
            /* resolveId(id, importer, options) {
                if (id === "/vite-plugin-mendix/runtime") {
                    return `\0${id}`;
                }
            },
            load(id, options) {
                if (id === `\0/vite-plugin-mendix/runtime`) {
                    return `import React from "react";
import ReactDOM from "react-dom";
import ReactDOMClient from "react-dom/client";
import ReactDOMScheduler from "scheduler";
import RuntimeDev from "react/jsx-dev-runtime";
import Runtime from "react/jsx-runtime";

export { React, ReactDOM, Runtime, RuntimeDev, ReactDOMClient, ReactDOMScheduler };`;
                }
            }, */
            configureServer(server) {
                server.middlewares.use(async (req, res, next) => {
                    const url = req.url!;
                    for (const prefix of prefixs) {
                        if (url.startsWith(prefix)) {
                            next();
                            return;
                        }
                    }
                    if (url.startsWith("/mxclientsystem/mxui/mxui.js")) {
                        serveFile(req, res, "dummy.js");
                        return;
                    }
                    if (url.startsWith("/mxui.js")) {
                        serveFile(req, res, "mxui.js");
                        return;
                    }

                    proxyRequest(req, res, url);
                });
            }
        }
    ]
});

function proxyRequest(req: Connect.IncomingMessage, res: ServerResponse, targetUrl: string): void {
    req.url = targetUrl;
    proxy.web(req, res, {
        changeOrigin: true,
        target: "http://localhost:8080"
    });
    proxy.on("error", err => {
        res.statusCode = 500;
        res.end(err.message);
    });
}
function serveFile(req: Connect.IncomingMessage, res: ServerResponse, filePath: string): void {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            // 发生错误时返回错误响应
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Internal Server Error");
            return;
        }
        // 返回文件内容作为响应
        res.writeHead(200, { "Content-Type": "text/javascript" });
        res.end(data);
    });
}
