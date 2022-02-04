const router = require('express').Router();
const withAuth = require('../utils/auth.js');

router.get('/', (req, res) => {
    res.render('all-posts')
});

router.get('/dashboard', withAuth, (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('layouts/dashboard');
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});


module.exports = router;
