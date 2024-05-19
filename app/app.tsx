// src/MyApp.tsx
import { getManifest } from "vinxi/manifest";
import { createAssets } from "@vinxi/react";
import { PropsWithChildren, Suspense } from "react";
import IndexPage from "./routes";
import AboutPage from "./routes/about";
import { WsProvider } from "../lib/use-signals";

const Assets = createAssets(
  getManifest("client").handler,
  getManifest("client")
);

const routes: Record<string, JSX.Element> = {
  "/": <IndexPage />,
  "/about": <AboutPage />,
};

export default function MyApp({
  url,
  children,
}: PropsWithChildren<{ url: string }>) {
  console.log(`MyApp${url}`);

  let route = routes[url] || routes["/"];

  return (
    <html>
      <head>
        <Suspense>
          <Assets />
        </Suspense>
      </head>
      <WsProvider>
        <body style={{ textAlign: "center" }}>
          {route}
          {children}
        </body>
      </WsProvider>
    </html>
  );
}
