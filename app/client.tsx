import { hydrateRoot } from "react-dom/client";
import "vinxi/client";
import MyApp from "./app";
import { WsProvider, useSignal } from "../lib/use-signals";

// @ts-expect-error
import { createFromFetch } from "@vinxi/react-server-dom/client";
import { useEffect, useState } from "react";

hydrateRoot(
  document,
  <MyApp url={window.location.pathname}>
    <WsProvider>
      <RSC />
    </WsProvider>
  </MyApp>
);

function RSC() {
  const chunk = useSignal<string>("rsc");
  const [ui, setUi] = useState<any>(`123`);

  useEffect(() => {
    if (!chunk) return;
    try {
      console.log(`chunk`, { chunk });
      const response = Promise.resolve(new Response(chunk));

      createFromFetch(response).then(
        (ui) => (console.log(`ui`, ui), setUi(ui))
      );
    } catch (err) {
      console.error(err);
    }
  }, [chunk]);

  return <h2>Chunk: WOW {ui}</h2>;
}
