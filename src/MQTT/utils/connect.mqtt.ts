import mqtt, { IClientOptions, MqttClient } from "mqtt";
import { log } from "utils";
import { config } from 'node-config-ts';
import dayjs from 'dayjs';

const options: IClientOptions = config.mqqt

const mqttClient: MqttClient = mqtt.connect(`mqtt://${config.host}`, options);

mqttClient.on("connect", () => {
  log.info(`MQTT has connected! ${dayjs().date().toString()}`);
});

mqttClient.on("error", (err) => {
  log.error(`Connect MQTT failed with error, ${err}`);
});

export default mqttClient;