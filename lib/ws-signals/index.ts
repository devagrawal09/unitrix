import { defineWebSocket } from "vinxi/http";
import type { WsSignalProtocolDown, WsSignalProtocolUp } from "../use-signals";
import { createEffect, createRoot } from "../signals";

const disposals: Map<string, () => void> = new Map();

export const signalsSocket = (
  exposedStuff: Record<string, undefined | (() => (...props: any[]) => any)>
) =>
  defineWebSocket({
    open: (event) => {
      // console.log("WebSocket opened 2");
    },
    message: (peer, event) => {
      console.log("WebSocket message received", event);

      const data = JSON.parse(event.text()) as WsSignalProtocolUp;

      if (data.type === "invoke") {
        const action = exposedStuff[data.action];
        if (action) {
          const res = action();
          peer.send(
            JSON.stringify({
              type: "result",
              action: data.action,
              payload: res,
            })
          );
        }
      }

      if (data.type === "pull") {
        const signal = exposedStuff[data.signal]?.();

        if (signal) {
          createRoot((dispose) => {
            disposals.set(data.signal, dispose);

            createEffect(() => {
              console.log(`pushing ${data.signal} `, signal());
              peer.send(
                JSON.stringify({
                  type: "push",
                  signal: data.signal,
                  payload: signal(),
                } satisfies WsSignalProtocolDown)
              );
            });
          });
        }
      }

      if (data.type === "dispose") {
        const dispose = disposals.get(data.signal);
        if (dispose) {
          dispose();
        }
      }
    },
    close: (event, details) => {
      // console.log("WebSocket closed 2");
    },
  });
