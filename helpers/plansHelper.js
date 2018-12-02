let fs = require('fs'); 
let mcache = require('memory-cache');

// getting all the plans
let getAllPlansHelper  = () => {
    return new Promise((resolve,reject)=>{
        let plansData = fs.readFileSync('./plans.json');     
        if(plansData)
            return resolve(JSON.parse(plansData));
        return reject("Couldn't get plan details");        
    })
}

// Adding a new plan
let addPlan = (req) =>{
    return new Promise((resolve,reject)=>{
        fs.readFile('./plans.json', (err,data) => {
            if(err || req.body==null)
                return reject("Couldn't insert plan");
            var plansData = JSON.parse(data);
            plansData.plans.push(req.body);
            fs.writeFileSync("./plans.json", JSON.stringify(plansData));
            return resolve("plans updated");
        })
    })
}


//Getting Efficient cost.
let getEfficientCost = (req) => {
    return new Promise((resolve,reject)=>{
        if(mcache.get('local'+req.query.local+'std'+req.query.std)){
            let planDetails = mcache.get('local'+req.query.local+'std'+req.query.std);
            planDetails.Cost = planDetails.Cost*(req.query.days/30)
            return resolve(planDetails);
        }
        let mincost=10000000;
        let plansData = fs.readFileSync('./plans.json');     
        let responsePlan;
        if(plansData){
            let plans = JSON.parse(plansData)
            plans.plans.forEach(plan => {
                let planPrice = ((plan.Price/100)*(req.query.days/plan.Validity) + ((req.query.local * plan.Type.Local) + (req.query.std * plan.Type.STD))/100);
                if(planPrice < mincost) {
                    mincost = planPrice;
                    responsePlan = plan;
                }
            });
            return resolve({"Cost":mincost,"PlanDetails":responsePlan});
        }
        return reject("Couldn't get best plan");
    })
}

module.exports ={
    getAllPlansHelper,
    getEfficientCost,
    addPlan
}