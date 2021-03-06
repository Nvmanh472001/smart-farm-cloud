import EventEmitter from "events";
import { IClientPublishOptions, MqttClient } from "mqtt";
import { relayResponseEvent } from "./helpers/relayResponseEvent.helper";
import { publishWithResponse } from "./helpers/mqqt-async.helper";
import mqttClient from "./utils/connect.mqtt";

const eventEmitter = new EventEmitter();

// ==> response/deviceName/relayName
mqttClient.subscribe("response/+/+");
mqttClient.subscribe("otherTopics/#");
mqttClient.on("message", (topic, payload) => {
  const topicArr = topic.split("/"); //spliting the topic ==> [response,deviceName,relayName]
  switch (topicArr[0]) {
        case "response":
            return relayResponseEvent({
                eventEmitter,
                deviceName: topicArr[1],
                relayName: topicArr[2],
                payload,
            });
        case "otherTopics":
            console.log("other topics");
            return;
        default:
            return console.log("can not find anything");
  }
});

const startSystem = () => {
    startResponsePatternExample({
        deviceName: "device_1",
        relayName: "relay_1",
        message: 1,
    });
    startResponsePatternExample({
        deviceName: "device_2",
        relayName: "relay_1",
        message: 1,
    });
};

const startResponsePatternExample = async ({
    deviceName,
    relayName,
    message,
}: {
    deviceName: string;
    relayName: string;
    message: 1 | 0;
}) => {
    try {
        const responseTopic = `response/${deviceName}/${relayName}`;
        const requestTopic = `request/${deviceName}/${relayName}`;
        const responseEventName = `responseEvent/${deviceName}/${relayName}`;
        const publishOptions: IClientPublishOptions = {
            qos: 1,
            properties: {
                responseTopic,
                correlationData: Buffer.from("secret", "utf-8"),
            },
        };

        const responseMessage = await publishWithResponse({
            client: mqttClient,
            data: message,
            publishOptions,
            requestTopic,
            responseEventName,
            eventEmitter,
        });

        console.log(`${deviceName}/${relayName} : ${responseMessage.message}`);

    } catch (error) {
        console.log(`${deviceName}/${relayName} : ${error}`);
    }
};
setTimeout(() => {
    startSystem();
}, 1000);