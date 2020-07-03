'use strict';
const delayQueue = require("./app/util/delay_queue");
class AppNacosHook {
    constructor(app) {
        this.app = app;
    }
    async didReady() {
         delayQueue.start(this.app);
    }

}
module.exports=AppNacosHook;
