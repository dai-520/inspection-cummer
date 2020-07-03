/* eslint valid-jsdoc: "off" */

'use strict';
require('babel-register')({
  plugins: [
    'transform-decorators-legacy',
  ],
});
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
const fs = require('fs');
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};
  const consumerCfg=JSON.parse(fs.readFileSync("rms-consumer.json"));
  config.redisUrl =consumerCfg.redis;
  config.keys = appInfo.name + '_1558595032295_9433';
  config.security = {
    xframe: {
      enable: false,
    },
    csrf: {
      enable: false,
    },
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  config.eggExtend={
     agent:true,
    //  app:true,
    name:"",
    discovery: {
      serverAddr: "rms-nacos:8848"
    }
  }

  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    // ...userConfig,
  };
};
