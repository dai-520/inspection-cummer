const Consumer = require('super-queue').Consumer;
var dealRadis = require('./utils')
var config = require('../util/config')
const consumer = new Consumer({
    queue: 'winston',
    prefix: 'wt',
    redis: config.config,
    // redis: {host: '10.168.1.110', port: 6379, db: 5},
    capacity: 0,
    heartbeat: 2,
});

/**
 * 从延迟队列中根据id查找job
 * @param {*} myqueue 
 * @param {*} id 
 */
async function findJob(myqueue, id) {
    let myJob = undefined;
    const jobs = await myqueue.getDelayed();
    for (let job of jobs) {
        if (job.data.id == id) {
            myJob = job;
            break;
        }
    }
    return myJob;
};
exports.consumer = (myqueue, app) => {
    console.log("enter consume")
    consumer.listen(async msg => {
        console.log("parse before cosumer get data success")
        const data = JSON.parse(msg.data)
        console.log("cosumer get data success",data)
        if (data.flag === 0) {  //新增
            await dealRadis.dealRadis(myqueue, data, app);
        } else if (data.flag === 1) {    //删除
            const findedJob = await findJob(myqueue, data.id);
            findedJob && findedJob.remove();
        } else if (data.flag === 2) {//更新
            const findedJob = await findJob(myqueue, data.id);
            if (findedJob) {
               await findedJob.remove();
               await dealRadis.dealRadis(myqueue, data, app);
            }
        } else if (data.flag === 'auto') {    //删除
            await dealRadis.dealRadis(myqueue, data, app);
        }
    })
}
