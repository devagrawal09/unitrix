import {
  useState,
  useEffect,
  createContext,
  PropsWithChildren,
  useContext,
} from "react";

export type WsSignalProtocolUp =
  | {
      type: "pull";
      signal: string;
    }
  | {
      type: "dispose";
      signal: string;
    }
  | {
      type: "invoke";
      action: string;
    };

export type WsSignalProtocolDown =
  | {
      type: "push";
      signal: string;
      payload: any;
    }
  | {
      type: "result";
      action: string;
      payload: any;
    };

function useWebSocket() {
  const ctx = useContext(wsContext);
  if (!ctx) throw new Error("useWebSocket must be used within a WsProvider");

  return ctx;
}

const wsContext = createContext<{
  ws?: WebSocket;
  message?: WsSignalProtocolDown;
} | null>(null);
export function WsProvider({ children }: PropsWithChildren) {
  const [message, setMessage] = useState<WsSignalProtocolDown>();
  const [ws, setWs] = useState<WebSocket>();

  // console.log(`message`, message);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000/_ws");

    ws.onopen = () => {
      // console.log("WebSocket opened");
      setWs(ws!);
    };

    ws.onmessage = (event) => {
      setMessage(JSON.parse(event.data) as WsSignalProtocolDown);
    };

    return () => ws.close();
  }, []);

  return (
    <wsContext.Provider value={{ message, ws }}>{children}</wsContext.Provider>
  );
}

export function useSignal<T>(signal: string) {
  const { message, ws } = useWebSocket();
  const [data, setData] = useState<T>();

  useEffect(() => {
    if (!message) return;
    if (message.type !== "push") return;
    if (message.signal !== signal) return;
    setData(message.payload);
    // console.log(`data`, message.payload);
  }, [message]);

  useEffect(() => {
    if (!ws) return;

    // console.log(`pulling ${signal}`);
    ws.send(JSON.stringify({ type: "pull", signal }));

    const dispose = () => {
      // console.log(`disposing ${signal}`);
      ws.send(JSON.stringify({ type: "dispose", signal }));
    };

    return dispose;
  }, [ws, signal]);

  return data;
}

export function useAction<T>(action: string) {
  const { ws } = useWebSocket();

  function invoke() {
    console.log(`invoking ${action}`);
    ws?.send(JSON.stringify({ type: "invoke", action }));
  }

  return invoke;
}
