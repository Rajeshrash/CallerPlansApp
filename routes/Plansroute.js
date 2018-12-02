const express = require('express');
const plansCtrl = require('../controllers/planscontroller');
const router = express.Router();

router.route('/getAllPlans').get(plansCtrl.getAllPlans);
router.route('/getEfficientPlan').get(plansCtrl.getEfficientPlan);
router.route('/addPlan').post(plansCtrl.addPlan);

module.exports = router