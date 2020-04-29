
const {feign}=require("egg-extend/feign");

@feign("rms-inspection")
class RmsRegular{
    constructor(app){
        this.app=app;
    }

    /**
     * 所有函数首行需要展开参数。其中第一个参数为运行时注入的
     */
    @feign.resource("/taskRegular")
    async getAll(obj){
        const balanceUrl=obj.balanceUrl;
        const result = await this.app.curl(balanceUrl, {
            dataType: 'json',
          });
        // console.log("Feign invoke "+JSON.stringify(result));
        return result.data;
    }

    
}

module.exports=RmsRegular;