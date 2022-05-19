interface RelayResponseMessage {
    error: boolean;
    message: string;
}

interface RelayRequestMessage {
    relayState: number
}

export { RelayRequestMessage, RelayResponseMessage }