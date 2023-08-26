//orca-pod-template-code

const { OrcaPulse } = require('orca-pulse');
const fs = require('fs')
const ss = require('socket.io-stream');

// const orca = new OrcaPulse({
//   orcaApiKey: '366e3ab5-6fa3-4299-99de-150c4505f9b9',
//   // podImageUrl: 'docker.io/nginxinc/nginx-unprivileged',
//     podImageUrl: 'docker.io/avi17/node-app-http-docker:v0',
//   podId: 'taskid1234',
//   orcaUrl: 'wss://localhost:3003',
// });


// orca.initialize({
//   orcaApiKey: '366e3ab5-6fa3-4299-99de-150c4505f9b9',
//   // podImageUrl: 'docker.io/nginxinc/nginx-unprivileged',
//   podImageUrl: 'docker.io/avi17/node-app-http-docker:v0',
//   podId: 'taskid1234',
//   orcaUrl: 'wss://localhost:3003',
// })


const orca = new OrcaPulse()


orca.initialize(
    '366e3ab5-6fa3-4299-99de-150c4505f9b9',
     'docker.io/avi17/healthz-test:0.0',
     'taskid1234',
    'wss://localhost:3003',
  ).then(() => {
    res = orca.podCall('api/todos', {

      body:{
        'title': 'test',
        'description': 'test',
        'completed': 'false',
      },
      route: "api/todos"
      }).then(res => {
      
        console.log("logging http request response", res)
      }).catch(err => {
      
        console.log("logging error for http",err)
      })
      
      orca.handle('test', () => {
        return;
      });

  fileStream = fs.createReadStream("./test.txt") 
  // console.log(fileStream)   
      
  writeFileStreamData = {    
    stream: fileStream, 
    fileName: "test.txt",
    }
      orca.podCall("writeFileStream",writeFileStreamData).then(res=>{
        console.log("loggin res", res)
      }).catch(error => console.log("logging error in catch for writeStream",error));
      

      nameofFileToStream="test.txt"
      filePathInOutDirectory = "/test1.txt"
      var stream = ss.createStream();
      // get list of files
      stream = orca.podCall("readFileStream",filePathInOutDirectory).then((stream, response)=>{
        // console.log("stream value",stream)
        stream.pipe(fs.createWriteStream(nameofFileToStream));
      
        console.log("logging stream response", response)
      }).catch(error=>{
        console.log("stream error",error)
      })
      

  }).catch((error)=>{

  })



// res = orca.podCall('api/todos', {

// body:{
//   'title': 'test',
//   'description': 'test',
//   'completed': 'false',
// },
// route: "api/todos"
// }).then(res => {

//   console.log("logging http request response", res)
// }).catch(err => {

//   console.log("logging error for http",err)
// })

// orca.handle('test', () => {
//   return;
// });

// nameofFileToStream="test.txt"
// filePathInOutDirectory = "/test.txt"
// var stream = ss.createStream();
// // get list of files
// stream = orca.podCall("readFileStream",filePathInOutDirectory).then((stream, response)=>{
//   // console.log("stream value",stream)
//   stream.pipe(fs.createWriteStream(nameofFileToStream));

//   console.log("logging stream response", response)
// }).catch(error=>{
//   console.log("stream error",error)
// })

//orca-pod-template-code
// TODO: Add code in orca-pulse to queue podCalls till containers up
// writeFilePath = "./test.txt"
// stream = fs.createReadStream(writeFilePath)
// var writeStream = orca.podCall("writeFileStream",{writeFilePath,stream})






// setTimeout(()=>{
//     orca.podCall('test');
//     orca.handle('test', () => {
//       return;
//     });
// }, 15000)

