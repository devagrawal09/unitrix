export class NotReadyError extends Error {}

export class NoOwnerError extends Error {
  constructor() {
    super(
      true
        ? "No root owner exists at time of call. Make sure `getContext` is called within an owner or create one first via `createRoot`."
        : ""
    );
  }
}

export class ContextNotFoundError extends Error {
  constructor() {
    super(
      true
        ? "Must provide either a default context value or set one via `setContext` before getting."
        : ""
    );
  }
}

export interface ErrorHandler {
  (error: unknown): void;
}
