// server code
import { createSignal } from "../lib/signals";
import { useAction, useSignal } from "../lib/use-signals";

const [count, setCount] = createSignal(0);

const doubleCount = () => count() * 2;

const increment = () => setCount(count() + 1);

// client code
export function ServerCounter() {
  const count = useSignal<number>("count");
  const doubleCount = useSignal<number>("doubleCount");

  const increment = useAction("increment");

  return (
    <section>
      <div>Count: {count}</div>
      <div>DoubleCount: {doubleCount}</div>
      <button onClick={() => increment()}>Increment</button>
    </section>
  );
}

export const exposedStuff: Record<string, undefined | (() => any)> = {
  count: count,
  increment: increment,
  doubleCount: doubleCount,
};
