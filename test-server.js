import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8765 });

let connectionCount = 0;

wss.on('connection', function connection(ws) {
  let messageCount = 0;
  connectionCount += 1;
  console.log('Connection Count', connectionCount)

  const message = {
    messageCount,
    connectionCount
  }

  ws.send(JSON.stringify(message));
  messageCount += 1;

  setInterval(() => {
    const message = {
      messageCount,
      connectionCount
    }

    ws.send(JSON.stringify(message));
    messageCount += 1;
  }, 1000)
});