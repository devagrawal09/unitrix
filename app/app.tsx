// src/MyApp.tsx
import { getManifest } from "vinxi/manifest";
import { createAssets } from "@vinxi/react";
import { Suspense } from "react";
import Counter from "./Counter";

const Assets = createAssets(
  getManifest("client").handler,
  getManifest("client")
);

export default function MyApp() {
  console.log(`MyApp`);
  return (
    <html>
      <head>
        <Suspense>
          <Assets />
        </Suspense>
      </head>
      <body>
        <h1>Building a React Metaframework</h1>
        <div id="app">
          <Counter />
        </div>
      </body>
    </html>
  );
}
