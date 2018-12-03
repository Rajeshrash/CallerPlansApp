let fs = require('fs');
let mcache = require('memory-cache');

// getting all the plans
let getAllPlansHelper = () => {
    return new Promise((resolve, reject) => {
        let plansData = fs.readFileSync('./plans.json');
        if (plansData)
            return resolve(JSON.parse(plansData));
        return reject("Couldn't get plan details");
    })
}

// Adding a new plan
let addPlan = (req) => {
    return new Promise((resolve, reject) => {
        fs.readFile('./plans.json', (err, data) => {
            if (err || req.body == null)
                return reject("Couldn't insert plan");
            var plansData = JSON.parse(data);
            if (!req.body.Type.Local)
                req.body.Type.Local = 100
            if (!req.body.Type.STD)
                req.body.Type.STD = 100
            plansData.plans.push(req.body);
            fs.writeFileSync("./plans.json", JSON.stringify(plansData));
            return resolve("plans updated");
        })
        return reject('Could not update the plans');
    })
}


//Getting Efficient cost.
let getEfficientCost = (req) => {
    return new Promise((resolve, reject) => {
        let mincost = 10000000;
        let minLocal = 10000000; 
        let minStd = 10000000;
        let plansData = fs.readFileSync('./plans.json');
        let responsePlan, localPlan, stdPlan,planPrice;
        if (plansData) {
            let plans = JSON.parse(plansData)
            plans.plans.forEach(plan => {
                planPrice = ((plan.Price / 100) * (req.query.days / plan.Validity) + ((req.query.local * plan.Type.Local) + (req.query.std * plan.Type.STD)) / 100);
                let localPrice = ((plan.Price / 100) * (req.query.days / plan.Validity)) + ((req.query.local * plan.Type.Local) / 100);
                let stdPrice = ((plan.Price / 100) * (req.query.days / plan.Validity)) + ((req.query.std * plan.Type.STD) / 100);
                if (planPrice < mincost) {
                    mincost = planPrice;
                    responsePlan = plan;
                }
                if (localPrice < minLocal) {
                    minLocal = localPrice;
                    localPlan = plan;
                }
                if (stdPrice < minStd) {
                    minStd = stdPrice;
                    stdPlan = plan;
                }
            });
            if ((minLocal + minStd) > planPrice){
                return resolve({
                    "Cost": mincost,
                    "PlanDetails": [responsePlan]
                });
            }
                
            else{
                return resolve({
                    "Cost": minLocal+minStd,
                    "PlanDetails": [localPlan,stdPlan]
                });
            }
        }
        return reject("Couldn't get best plan");
    })
}

module.exports = {
    getAllPlansHelper,
    getEfficientCost,
    addPlan
}


 // if (mcache.get('local' + req.query.local + 'std' + req.query.std)) {
        //     let planDetails = mcache.get('local' + req.query.local + 'std' + req.query.std);
        //     planDetails.Cost = planDetails.Cost * (req.query.days / 30)
        //     return resolve(planDetails);
        // }