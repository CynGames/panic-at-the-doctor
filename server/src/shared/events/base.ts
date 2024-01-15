export abstract class AppEvent {
  static eventName = "undefined";
  abstract readonly payload: unknown;
  get name(): string {
    return (this.constructor as typeof AppEvent).eventName;
  }
}

export const defineEvent = <P = unknown>(eventName: string) => {
  return class extends AppEvent {
    static eventName = eventName;
    readonly payload: P;
    constructor(input: P) {
      super();

      this.payload = input;
    }

    getPayload(): P {
      return this.payload;
    }
  };
};

export type PayloadOf<E extends AppEvent> = E["payload"];
