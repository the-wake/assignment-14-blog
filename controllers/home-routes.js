const router = require('express').Router();
const { Post } = require('../models');
const withAuth = require('../utils/auth.js');

// /
// See all posts
router.get('/', async (req, res) => {
    try {
        const allPosts = await Post.findAll();
        const posts = allPosts.map((post) => post.get({ plain: true }));
        res.status(200).render('home-page', { posts, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
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

// See specific post
router.get('/id=:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);
        if (!postData) {
            res.status(404).json({ message: 'No post with this ID!' });
            return;
        }
        const post = postData.get({ plain: true });
        res.render('single-post', { post, loggedIn: req.session.loggedIn });
    } catch (err) {
        res.status(500).json(err);
    };
});


module.exports = router;
