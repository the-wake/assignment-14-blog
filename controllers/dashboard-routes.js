const router = require('express').Router();
const { Post } = require('../models');
const withAuth = require('../utils/auth.js');


// dashboard
// show all of my posts
router.get('/', withAuth, async (req, res) => {
    try {
        const allPosts = await Post.findAll();
        const posts = allPosts.map((post) => post.get({ plain: true }));
        res.status(200).render('all-posts-admin', { posts, layout: 'dashboard', loggedIn: req.session.loggedIn, userSession: req.session.username });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// /dashboard/new
// New post page
router.get('/new', withAuth, async (req, res) => {
    try {
        res.status(200).render('new-post', { layout: 'dashboard', loggedIn: req.session.loggedIn, userSession: req.session.username });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Edit a post
router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);
        if (!postData) {
            res.status(404).json({ message: 'No post with this ID!' });
            return;
        }
        const post = postData.get({ plain: true });
        res.render('edit-post', { post, layout: 'dashboard', loggedIn: req.session.loggedIn, userSession: req.session.username });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


module.exports = router;
