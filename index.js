const { OrcaPulse } = require('orca-pulse');
const fs = require('fs')
const ss = require('socket.io-stream');

const orca = new OrcaPulse()
const process = require('process')

orca.initialize(
   'docker.io/1703706/cryo:v1-slim ',
   'taskid1234',
   'wss://localhost:3003',
).then(() => {
   collect = orca.podCall('collect', {
      headers: {
         'Content-Type': 'application/json'
      },
      body: {
         'datatype': 'blocks',
         'start_block': '100000',
         'end_block': '100005',
         'rpc_url': "https://internal.ethereum.n.chaindeck.io/278e1b2ab91f2ca96f7b8761bf65b9b2"
      },
   }).then(collect => {

      console.log("etl data", collect)
   }).catch(err => {

      console.log("error is in collect podcall", err)
   })

   setTimeout(() =>
      {
         orca.close()
         process.exit()
      }, 5000)
}).catch((error) => {
console.log("inside catch error", error)
})
