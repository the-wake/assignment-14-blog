const router = require('express').Router();
const withAuth = require('../utils/auth.js');

// /dashboard/new
// New post page
router.get('/new', withAuth, async (req, res) => {
    try {
        res.status(200).render('new-post', {layout: 'dashboard'});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
