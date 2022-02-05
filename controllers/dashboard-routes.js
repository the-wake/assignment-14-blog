const router = require('express').Router();
const { Post } = require('../models');
const withAuth = require('../utils/auth.js');


// dashboard
// show all of my posts
router.get('/', withAuth, async (req, res) => {
    try {
        const allPosts = await Post.findAll();
        const posts = allPosts.map((post) => post.get({ plain: true }));
        res.status(200).render('all-posts-admin', { posts, layout: 'dashboard', loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// /dashboard/new
// New post page
router.get('/new', withAuth, async (req, res) => {
    try {
        res.status(200).render('new-post', {layout: 'dashboard', loggedIn: req.session.loggedIn});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
