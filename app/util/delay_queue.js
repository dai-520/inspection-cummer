const Queue = require("bull");
const consumer = require("./consumer")
var config = require('../util/config')
let redisUrl = `redis://${config.config.host}:${config.config.port}/${config.config.db}`
var myqueue = new Queue('winston', redisUrl, { prefix: 'wt' });
var dealRadis = require('./utils')
const result = {
    start: async function (app) {
        console.log("enter start")
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
         console.log("exit start")
    }
};


module.exports = result;