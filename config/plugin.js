'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  eggExtend:{
    enable:true,
    package:"egg-extend"
  }
  // cluster:{
  //   enable: true,
  // }
};
