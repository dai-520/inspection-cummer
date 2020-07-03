const Consumer = require('super-queue').Consumer;
var dealRadis = require('./utils')
let p;
exports.init = (redis)=>{
    p = new Consumer({
      // 队列名称
      queue: 'winston',
      prefix: 'wt',
      // 设置Redis数据库连接
      redis: redis,
      // 默认的消息有效时间(s)，为0表示永久
      maxAge: 0,
      // 心跳时间周期（s），默认2秒
      heartbeat: 2,
    })
}
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
    console.log("enter consume",p)
    p.listen(async msg => {
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
