import EventEmitter from "events";
import { RelayResponseMessage } from "MQTT/interfaces/relay.interface";

export function relayResponseEvent({
  eventEmitter,
  deviceName,
  relayName,
  payload,
}: {
  eventEmitter: EventEmitter;
  deviceName: string;
  relayName: string;
  payload: Buffer;
}) {
  const eventName = `responseEvent/${deviceName}/${relayName}`;
  const eventData: RelayResponseMessage = JSON.parse(payload.toString());
  return eventEmitter.emit(eventName, eventData);
}