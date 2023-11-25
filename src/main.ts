const worker = new SharedWorker(new URL('./worker.ts', import.meta.url))

worker.port.onmessage = event => {
  console.log('Received Worker onmessage', event)
}

worker.port.start()
console.log(worker)

const socketConnection = new WebSocket('ws://localhost:8765')

const messageCountDiv = document.getElementById('message-count')
const connectionCountDiv = document.getElementById('connection-count')

if (messageCountDiv === null) throw Error('Cannot find messageCountDiv')
if (connectionCountDiv === null) throw Error('Cannot find connectionCountDiv')


socketConnection.onmessage = message => {
  const messageAsJson = JSON.parse(message.data)
  messageCountDiv.innerText = messageAsJson.messageCount
  connectionCountDiv.innerText = messageAsJson.connectionCount
}