const router = require('express').Router();
const withAuth = require('../../utils/auth.js');

// /api/posts
// Get all posts
router.get('/', async (req, res) => {
    try {
        res.status(200).render('all-posts', {loggedIn: req.session.loggedIn});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Get specific post
router.get('/:id', withAuth, async (req, res) => {
    try {
        res.status(200).render('single-post', {loggedIn: req.session.loggedIn});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Create a post
router.post('/', withAuth, async (req, res) => {
    try {
        res.status(200).render('single-post', {loggedIn: req.session.loggedIn});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
