const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth.js');

// /
// See all posts
router.get('/', async (req, res) => {
    try {
        const allPosts = await Post.findAll({
            include: {
                model: User,
            }
        });
        const posts = allPosts.map((post) => post.get({ plain: true }));
        console.log(posts);
        res.status(200).render('home-page', { posts, loggedIn: req.session.loggedIn, userSession: req.session.username });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// See specific post
router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: {
                model: User,
            }
        });
        if (!postData) {
            res.status(404).json({ message: 'No post with this ID!' });
            return;
        }
        const post = postData.get({ plain: true });
        res.render('single-post', { post, loggedIn: req.session.loggedIn, userSession: req.session.username });
    } catch (err) {
        res.status(500).json(err);
    };
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login', { loggedIn: req.session.loggedIn, userSession: req.session.username });
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup', { loggedIn: req.session.loggedIn, userSession: req.session.username });
});


module.exports = router;
