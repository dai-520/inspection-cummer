
const {feign}=require("egg-extend/feign");

@feign("rms-inspection")
class RmsJob{
    constructor(app){
        this.app=app;
    }

    /**
     * 所有函数首行需要展开参数。其中第一个参数为运行时注入的
     */
    @feign.resource("/inspectJob")
    async addJob(obj,job){
        const balanceUrl=obj.balanceUrl;
        const result = await this.app.curl(balanceUrl, {
        dataType: 'json',
        contentType: 'json',
        method: 'POST',
        data: job
          }); 
          console.log("addJob",result.data)
        return result;
    }
    @feign.resource("/inspectJob")
    async getJob(obj,parms){
        const balanceUrl=obj.balanceUrl;
        const result = await this.app.curl(balanceUrl+`/${parms}`, {
            dataType: 'json'
          });
          console.log("getJob", result.data)
        return result.data;
    }
}

module.exports=RmsJob;