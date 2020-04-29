const Queue = require("bull");
var myqueue = new Queue('winston', 'redis://10.168.1.110:6379', { prefix: 'wt' });
const Consumer = require('super-queue').Consumer;
const consumer = new Consumer({
    queue: 'winston',
    prefix: 'wt',
    redis: { host: '10.168.1.110', port: 6379, db: 5},
    capacity: 0,
    heartbeat: 2,
});
// myqueue.on('completed', async (job, result) => {
    
    // console.log('qqqqqqqqqqqqqqqqq',jobs)
   
    // for(job of jobs){
    //     if(id === job.opts.jobId){
    //         console.log('hahahahhahahh')
    //         job.remove();
    //     }
    // }
  
    // console.log("size" + JSON.stringify(jobs));
// })
// Delayed 5 seconds
console.log('consumerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
consumer.listen(async msg => {
    // console.log('sssssssssssssssss',JSON.parse(msg.originData))
    console.log('fffffffffffffffffffff',msg)
     msg.resolve(`fuck000000000000000000000 ${ msg }`)
     
    //  const  obj = JSON.parse(msg.data)
    // if(obj.flag ===0 ){
    //     const myjob= await myqueue.add(obj, {removeOnComplete:true,
    //         repeat: {
    //             every: 10000,
    //             limit: 100
    //         }
    // });
    // }else{
    //     const jobs=await myqueue.getDelayed();
    //     const delId=obj.id;
    //     for(job of jobs){
    //         if(job.data.id==delId){
    //             job.remove();
    //             break;
    //         }
                
    //     }
    // }
})

//  myqueue.add({name:'www'}, {//removeOnComplete:true,
//     repeat: {
//         every: 10000,
//         limit: 100
//     }
// });
    // myqueue.process(async (job) => {
    //     // let progress = 0;
    //     console.log("process",id);
    //     job.progress(100);
    // });