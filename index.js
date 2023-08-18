//orca-pod-template-code

const { OrcaPulse } = require('orca-pulse');
const fs = require('fs')
const ss = require('socket.io-stream');

const orca = new OrcaPulse({
  orcaApiKey: 'f1436380-c535-4b4f-b35c-ef353b981b1c',
  podImageUrl: 'docker.io/avi17/node-app-http-docker:v0',
  podId: 'taskid1234',
  orcaUrl: 'ws://localhost:3003',
});

res = orca.podCall('httpTest', {


  'title': 'test',
  'description': 'test',
  'completed': 'false',

}).then(res => {

  console.log("logging http request", res)
}).catch(err => {

  console.log("logging error",err)
})

orca.handle('test', () => {
  return;
});

nameofFileToStream="test.txt"
filePathInOutDirectory = "/test.txt"
var stream = ss.createStream();
stream = orca.podCall("readFileStream",filePathInOutDirectory).then((stream, response)=>{
  console.log("stream value",stream)
  stream.pipe(fs.createWriteStream(nameofFileToStream));

  console.log("logging response", response)
}).catch(error=>{
  console.log("stream error",error)
})
//orca-pod-template-code
// TODO: Add code in orca-pulse to queue podCalls till containers up






setTimeout(()=>{
    orca.podCall('test');
    orca.handle('test', () => {
      return;
    });
}, 15000)