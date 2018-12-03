let plansHelper = require('../helpers/plansHelper');

let getAllPlans = (req,res) =>{
    plansHelper.getAllPlansHelper().then((response)=>{
        res.json(response);
    }).catch((err)=>{
        res.json({"Error":err});
    })
}

let addPlan = (req,res) =>{
    plansHelper.addPlan(req).then((response)=>{
        res.json({"Message":response});
    }).catch((err)=>{
        res.json({"Error":err});
    })
}

let getEfficientPlan =(req,res) => {
    plansHelper.getEfficientCost(req).then((response)=>{
        res.json(response);
    }).catch((err)=>{
        res.json({"Error":JSON.stringify(err)})
    })
}

module.exports ={
    getAllPlans,
    getEfficientPlan,
    addPlan
}