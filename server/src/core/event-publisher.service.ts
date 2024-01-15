import { Injectable, Logger } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { AppEvent } from "../shared/events/base";

@Injectable()
export class EventPublisherService {
  constructor(private eventEmitter: EventEmitter2) {}
  async publish(events: AppEvent[]): Promise<void> {
    events.map((event) => this.eventEmitter.emit(event.name, event.payload));
  }
}
