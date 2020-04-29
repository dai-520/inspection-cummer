const Producer = require('super-queue').Producer;

const p = new Producer({
  // 队列名称
  queue: 'winston',
  prefix:'wt',
  // 设置Redis数据库连接
  redis: {host: '10.168.1.110', port: 6379, db: 5},
  // 默认的消息有效时间(s)，为0表示永久
  maxAge: 0,
  // 心跳时间周期（s），默认2秒
  heartbeat: 2,
});

// 消息入队
// const data = 'abcdefg'; // 消息内容，必须为字符串类型
// const maxAge = 10;      // 消息有效时间，当省略此参数时使用默认的maxAge值
// p.push({data, maxAge}, (err, ret) => {
//   if (err) {
//     // 消息处理出错
//     // 如果超过指定时间消费者未返回处理结果，则会返回MessageProcessingTimeoutError
//     console.error(err);
//   } else {
//     // 消息的处理结果
//     console.log(ret);
//   }
// });

// 初始化成功，触发start事件
// 注意：一定要在触发此事件后再使用push()，否则可能无法收到消息处理结果
p.on('start', () => {
  console.log('start');
  let count = 0;
    process.nextTick( ()=> {
      p.push({
        // data: JSON.stringify({ flag:0,data:'44444444444444444' }),
        data:JSON.stringify({"id":19,
        "deviceId":27,
        "projectId":147,
        "projectName":"融创智谷二期建设项目",
        "createdOn":1563358402000,
        "createdBy":"3",
        "modifiedBy":"3",
        "modifiedOn":1563417901074,
        "flag":true,
        "type":"edit",
        "enterDate":1563321600000,
        "lnglat":"[114.320896,30.455031]",
        "exitDate":1563494400000,
        "_query":null}),
        maxAge: Math.random() * 2,
        flag:0
      },(err, ret) => {
          if (err) {
            // 消息处理出错
            // 如果超过指定时间消费者未返回处理结果，则会返回MessageProcessingTimeoutError
            console.error(err);
          } else { 
            // 消息的处理结果
            console.log(ret);
          }
        })
       
         
        p.push({
          data:JSON.stringify({"id":19,
          "deviceId":27,
          "projectId":147,
          "projectName":"融创智谷二期建设项目",
          "createdOn":1563358402000,
          "createdBy":"3",
          "modifiedBy":"3",
          "modifiedOn":1563417901074,
          "flag":true,
          "type":"edit",
          "enterDate":1563321600000,
          "lnglat":"[114.320896,30.455031]",
          "exitDate":1563494400000,
          "_query":null}),
          maxAge: Math.random() * 2,
        },(err, ret) => {
            if (err) {
              // 消息处理出错
              // 如果超过指定时间消费者未返回处理结果，则会返回MessageProcessingTimeoutError
              console.error(err);
            } else { 
              // 消息的处理结果
              console.log(ret);
            }
          })
  });
     
  // }
});