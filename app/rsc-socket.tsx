// server code
import { createSignal } from "../lib/signals";
// @ts-expect-error
import { renderToPipeableStream } from "@vinxi/react-server-dom/server";
import { Writable, Readable } from "stream";
import { Suspense } from "react";

const [count, setCount] = createSignal(0);

const doubleCount = () => count() * 2;

const increment = () => setCount(count() + 1);

export function CounterRSC() {
  return (
    <div>
      <Suspense>
        <div>Count</div>
      </Suspense>
    </div>
  );
}

export const exposedStuff = {
  count: () => count,
  increment: () => increment,
  doubleCount: () => doubleCount,
  rsc: () => {
    console.log(`component`);
    const [getStream, setStream] = createSignal("");
    const stream: Readable = renderToPipeableStream(<CounterRSC />);

    let chunks = "";

    stream
      .pipe(
        new Writable({
          write(chunk, encoding, callback) {
            console.log(`Received chunk: ${chunk.toString()}`);
            chunks = chunks.concat(chunk);
            callback();
          },
        })
      )
      .on("finish", () => {
        console.log(`chunks`, { chunks });
        setStream(chunks);
      });

    return getStream;
  },
};

// Create a writable stream to consume the data
const writable = new Writable({
  write(chunk, encoding, callback) {
    console.log(`Received chunk: ${chunk.toString()}`);
    callback();
  },
});
