const worker = new SharedWorker(new URL('./worker.ts', import.meta.url))

worker.port.start()

const messageCountDiv = document.getElementById('message-count')
const connectionCountDiv = document.getElementById('connection-count')

if (messageCountDiv === null) throw Error('Cannot find messageCountDiv')
if (connectionCountDiv === null) throw Error('Cannot find connectionCountDiv')

worker.port.onmessage = message => {
  const messageAsJson = JSON.parse(message.data)
  messageCountDiv.innerText = messageAsJson.messageCount
  connectionCountDiv.innerText = messageAsJson.connectionCount
}
