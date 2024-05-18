import { createApp } from "vinxi";

export default createApp({
  server: {},
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
    },
    {
      name: "ssr",
      type: "http",
      handler: "./app/server.tsx",
      target: "server",
    },
  ],
});
