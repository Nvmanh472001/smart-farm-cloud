import { IClientPublishOptions, MqttClient } from "mqtt"
import { RelayRequestMessage, RelayResponseMessage } from "MQTT/interfaces/relay.interface";
import EventEmitter from "events";


export function publishWithResponse({
    client,
    data,
    publishOptions,
    responseEventName,
    requestTopic,
    eventEmitter,
  }: {
    client: MqttClient;
    data: 0 | 1;
    publishOptions: IClientPublishOptions;
    requestTopic: string;
    responseEventName: string;
    eventEmitter: EventEmitter;
  }): Promise<RelayResponseMessage> {
    return new Promise((resolve, reject) => {
        const checkTimeOut = setTimeout(() => {
            const relayResponseMessage: RelayResponseMessage = {
                error: true,
                message: "timeOut",
            };
    
            eventEmitter.emit(responseEventName, relayResponseMessage);
        }, 5000);

        eventEmitter.once(
            responseEventName,
            (relayResponseMessage: RelayResponseMessage) => {
            clearTimeout(checkTimeOut);
            relayResponseMessage.error
                ? reject(relayResponseMessage.message)
                : resolve(relayResponseMessage);
            }
        );
    
        const payload = { relayState: data };
        client.publish(requestTopic, JSON.stringify(payload), publishOptions);
    });
}
