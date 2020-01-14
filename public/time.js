var Job = require ('./job.js')
var job = new Job()
job.on('done', (details)=>{
    console.log("Work completed on:", details.CompletedOn)
})
job.emit('start');
