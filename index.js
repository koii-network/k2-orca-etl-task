const {OrcaPulse} = require('orca-pulse');

const orca = new OrcaPulse({
  orcaApiKey: 'f1436380-c535-4b4f-b35c-ef353b981b1c',
  podImageUrl: 'docker.io/chaindeck/ubuntu',
  podId: 'taskid1234',
  orcaUrl: 'ws://localhost:3003',
});

// TODO: Add code in orca-pulse to queue podCalls till containers up


setTimeout(()=>{
    orca.podCall('test');
    orca.handle('test', () => {
      return;
    });
}, 15000)