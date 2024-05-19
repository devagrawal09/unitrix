import { createApp } from "vinxi";
// @ts-expect-error
import { serverComponents } from "@vinxi/server-components/plugin";

export default createApp({
  server: {
    experimental: {
      websocket: true,
    },
  },
  routers: [
    {
      name: "public",
      type: "static",
      dir: "./public",
      base: "/",
    },
    {
      name: "client",
      type: "client",
      handler: "./app/client.tsx",
      target: "browser",
      base: "/_build",
      plugins: () => [serverComponents.client()],
    },
    {
      name: "ssr",
      type: "http",
      handler: "./app/server.tsx",
      target: "server",
    },
    {
      name: "api",
      type: "http",
      handler: "./app/api.ts",
      target: "server",
      base: "/api",
    },
    {
      name: "websocket",
      type: "http",
      handler: "./app/ws.ts",
      target: "server",
      base: "/_ws",
      plugins: () => [serverComponents.server()],
    },
  ],
});
