const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('all-posts')
});

module.exports = router;
