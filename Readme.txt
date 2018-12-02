Different Api's

1. /api/getAllPlans (GET) 
    Gets the details of the existing getAllPlans.
2. /api/addPlan (POST)
    Adds a plan to the list of existing plans.
    Request body:
        {
            "Name":"Plan Name",
            "Price":"Price of plan in paise",
            "Validity":"Validity in days",
            "Type":{
                "STD":"cost in paise/min", (Default 100)
                "Local":"cost in paise/min", (Default 100)
            }
        }
3. /api/getEfficientPlan (GET)
    Gets the effcient plan and cost for given STD minutes and Local minutes.
    it has 3 query parameters
        local: usage of local minutes
        std : usage of std minutes
        days: Number of days of usage 
        for example:
            /api/getEfficientPlan?local=100&std=100&days=30