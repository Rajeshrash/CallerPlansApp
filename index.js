let express = require('express')
let app = express();
let plansRouter = require('./routes/Plansroute');
let bodyParser = require('body-parser');
let fs = require('fs');
let mcache = require('memory-cache');
app.use(bodyParser.urlencoded({
    extended: false,
    limit: '50mb',
    extended: true
}));
app.use(bodyParser.json({
    extended: true
}))

let plansData = fs.readFileSync('./plans.json');
if (plansData) {
    let plans = JSON.parse(plansData)
    for (let i = 0; i < 2000; i++) {
        for (let j = 0; j < 2000; j++) {
            let mincost = 10000000;
            let responsePlan;
            plans.plans.forEach(plan => {
                let planPrice = ((plan.Price / 100) * (30 / plan.Validity) + (((i + 1) * plan.Type.Local) + ((j + 1) * plan.Type.STD)) / 100);
                if (planPrice < mincost) {
                    mincost = planPrice;
                    responsePlan = plan;
                }
            });
            mcache.put('local' + (i + 1) + 'std' + (j + 1), {
                "Cost": mincost,
                "Plan": responsePlan
            })
        }
    }
}


app.use('/api', plansRouter);

app.listen(6000, () => {
    console.log("Server started on port 6000");
})