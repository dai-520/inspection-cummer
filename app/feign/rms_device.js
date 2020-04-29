
const {feign}=require("egg-extend/feign");

@feign("rms-device")
class RmsDevice{
    constructor(app){
        this.app=app;
    }

    /**
     * 所有函数首行需要展开参数。其中第一个参数为运行时注入的
     */
    // @feign.resource("/DeviceTransfer")
    // async getDevice(obj){
    //     const balanceUrl=obj.balanceUrl;
    //     const result = await this.app.curl(balanceUrl, {
    //         dataType: 'json',
    //       });
    //     return result.data;
    // }
    @feign.resource("/DeviceTransfer")
    async addDevice(obj,device){
        const balanceUrl=obj.balanceUrl;
        const result = await this.app.curl(balanceUrl, {
            dataType: 'json',
            contentType: 'json',
            method: 'POST',
            data: device
          });
          console.log('dddddddddddddddddddddaddDevice',result)
        return result.data;
    }
    @feign.resource("/DeviceTransfer")
    async editDevice(obj,device){
        const balanceUrl=obj.balanceUrl;
        const result = await this.app.curl(balanceUrl+`/${device.id}`, {
            dataType: 'json',
            contentType: 'json',
            method: 'PUT',
            data: device
          });
          console.log('aaaaaaaaaaaaaaaaaaaditDevice',result)
        return result.data;
    }
    
}

module.exports=RmsDevice;