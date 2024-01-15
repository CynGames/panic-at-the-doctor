import { AppEvent } from "./events/base";

// export abstract class WithEvents {
//   protected events: Array<AppEvent> = [];
//
//   public pullEvents(): Array<AppEvent> {
//     const events = this.events;
//     this.clearEvents();
//     return events;
//   }
//
//   private clearEvents(): void {
//     this.events = [];
//   }
// }

export type WithEvents<T = unknown> = {
  generatedEvents: Array<AppEvent>;
} & (T extends null
  ? //   biome-ignore lint/complexity/noBannedTypes: <explanation>
    {}
  : { data: T });
