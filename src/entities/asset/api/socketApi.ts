import { SOCKET_URL } from "../../../shared/constants";

let socket: WebSocket | null = null;

export interface ConnectWebSocketProps<T> {
  queryParams: Record<string, string>;
  onAssetsUpdate: (data: T) => void;
}

export const connectWebSocket = <T>({
  queryParams = {},
  onAssetsUpdate,
}: ConnectWebSocketProps<T>): void => {
  if (!socket) {
    const url = `${SOCKET_URL}${
      queryParams ? `?streams=${queryParams.streams}` : ""
    }`;
    socket = new WebSocket(url);

    socket.onopen = () => {
      console.log("✅ Connected to WebSocket server");
    };

    socket.onclose = () => {
      console.warn("❌ Disconnected from WebSocket server");
    };

    socket.onerror = (error) => {
      console.error("⚠️ WebSocket error:", error);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onAssetsUpdate(data);
    };
  }
};

export const disconnectWebSocket = (): void => {
  socket?.close();
  socket = null;
};

export const requestUpdate = (id: number): void => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    const message = JSON.stringify({ id });
    socket.send(message);
  }
};
