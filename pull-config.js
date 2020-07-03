const NacosConfigClient = require('nacos').NacosConfigClient;
const fs = require('fs');
const nacosUrl = "rms-nacos:8848";
const configClient = new NacosConfigClient({
serverAddr: nacosUrl
});

(async()=>{
    const inspectionCfg =await configClient.getConfig('rms-consumer', 'DEFAULT_GROUP')
    fs.writeFileSync('rms-consumer.json', inspectionCfg)
    console.log("hello config")
    process.exit()
})()
