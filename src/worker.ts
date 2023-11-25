const sw: SharedWorkerGlobalScope = self as any

const connectedClients: MessagePort[] = [];

// This will hold the WebSocket connection
let socket: WebSocket | null = null;

// Function to initialize the WebSocket connection
function initializeWebSocket() {
  socket = new WebSocket('ws://localhost:8765');

  socket.onopen = () => {
    console.log('WebSocket connection established');
  };

  socket.onmessage = (event) => {
    connectedClients.forEach(client => client.postMessage(event.data));
  };

  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  socket.onclose = () => {
    console.log('WebSocket connection closed');
  };
}


sw.onconnect = (e) => {
  console.log('Received connection event', e)
  const port = e.ports[0];
  console.log('Connected on port', port)
  console.log('All ports', e.ports)
  connectedClients.push(port);

  port.start(); // Start the message port
};

// Initialize WebSocket connection
initializeWebSocket();
