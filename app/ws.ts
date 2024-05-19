import { eventHandler } from "vinxi/http";
import { signalsSocket } from "../lib/ws-signals";
import { exposedStuff } from "./rsc-socket";

export default eventHandler({
  handler: () => {},
  websocket: signalsSocket(exposedStuff),
});
