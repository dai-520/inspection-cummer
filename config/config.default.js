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
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  config.keys = appInfo.name + '_1558595032295_9433';

  // add your middleware config here
  // config.middleware = ["advBody"];
  // config.advBody={
  //   multipart: true
  // }
  config.security = {
    xframe: {
      enable: false,
    },
    csrf: {
      enable: false,
    },
  };
   // egg cluster config
  // config.cluster = {
  //   listen: {
  //     port: 8081,
  //     hostname: '127.0.1.1',
  //   },
  // };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  config.eggExtend={
     agent:true,
    //  app:true,
    name:"",
    discovery: {
      serverAddr: "10.168.1.110:8848"
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
