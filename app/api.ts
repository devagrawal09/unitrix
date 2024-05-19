import { eventHandler } from "vinxi/http";

export default eventHandler(async (event) => {
  console.log(`API`);

  return { message: "Hello from the server!" };
});
