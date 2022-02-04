const router = require('express').Router();
const withAuth = require('../utils/auth.js');

router.get('/', (req, res) => {
    res.render('all-posts', {loggedIn: req.session.loggedIn})
});

router.get('/dashboard', withAuth, (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('all-posts-admin', {layout: 'dashboard'});
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login', {loggedIn: req.session.loggedIn});
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup', {loggedIn: req.session.loggedIn});
});


module.exports = router;
