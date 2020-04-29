
const {feign}=require("egg-extend/feign");

@feign("rms-inspection")
class RmsReview{
    constructor(app){
        this.app=app;
    }

    /**
     * 所有函数首行需要展开参数。其中第一个参数为运行时注入的
     */
    @feign.resource("/inspectReview")
    async addReview(obj,job){
         console.log('fffffffffinspectReview',job)
        const balanceUrl=obj.balanceUrl;
        const result = await this.app.curl(balanceUrl, {
        dataType: 'json',
        contentType: 'json',
        method: 'POST',
        data: job
          }); 
        return result;
    }
}

module.exports=RmsReview;