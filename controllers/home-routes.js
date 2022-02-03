const router = require('express').Router();

const api = require('./api');
const dashboardRoutes = require('./dashboard-routes.js')

router.use('/api', api);
router.use('/home', dashboardRoutes)

module.exports = router;
