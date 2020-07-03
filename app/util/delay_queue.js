const Queue = require("bull");
const consumer = require("./consumer")
var dealRadis = require('./utils')
const result = {
    start: async function (app) {
        consumer.init(app.config.redisUrl)
        // let url =  `redis://${app.config.redisUrl.host}:${app.config.redisUrl.port}/${app.config.redisUrl.db},password=${app.config.redisUrl.password}`
        // let url = {redis:app.config.redisUrl}
        let  myqueue = new Queue('winston', {redis:app.config.redisUrl, prefix: 'wt' });
        console.log("enter start",myqueue)
        const { data } = await app.feign.rmsRegular.getAll({});
        console.log("enter start get data",data);
        if(!data){
          console.log("enter start,get data failed.")
          return
        } 
        const datas = data;
        for (let data of datas) {
            dealRadis.dealRadis(myqueue,data,app);        
        }
         consumer.consumer(myqueue,app)
         console.log("exit start",app.config.redisUrl)
    }
};


module.exports = result;