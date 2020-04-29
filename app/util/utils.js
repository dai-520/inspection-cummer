
var moment = require('moment');
async function findJob(myqueue, id) {
    let myJob = undefined;
    const jobs = await myqueue.getDelayed();
    for (let job of jobs) {
        if (job.data.id == id) {
            myJob = job;
            break;
        }
    }
    return myJob;
};
exports.dealRadis = async (myqueue,data,app) =>{
    myqueue.add(data.id+"",data, {
        removeOnComplete: true,
        repeat: {
            cron: data.cron,
            startDate: data.startDate
        }
    }).then((myJob) => {
        myqueue.process(myJob.data.id+ "" ,async (job, done) => {
            if(job.data.flag && job.data.flag ==='auto'){
                const rmsJobs =  await app.feign.rmsJob.getJob({},job.data.id)
                if(rmsJobs.data.status && rmsJobs.data.status ===1){
                    const InspectJobObj = {inspectJobId:job.data.id,recipientId:job.data.recipientId,submitId:job.data.submitId,comment:'自动审核通过',status:0}
                    app.feign.rmsReview.addReview({},InspectJobObj)
                    const findedJob = await findJob(myqueue, job.data.id);
                    findedJob && findedJob.remove();
                }
            }else{
                var stTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
                var endTime = moment(stTime).add(+job.data.taskDuration, 'hours').format('YYYY-MM-DD HH:mm:ss')
                const InspectJobObj = { companyId:job.data.companyId,requirement: job.data.requirement, startDate: stTime,priority:job.data.priority,endDate: endTime,
                status:0,inspectorId: job.data.inspectorIds,pointId:job.data.pointId,deviceId:job.data.deviceId,projectId:job.data.projectId}
                if(job.data.status === 0) {
                    app.feign.rmsJob.addJob({},InspectJobObj)
                } 
            }
            done()
           })
     })
}
