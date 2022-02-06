const router = require('express').Router();
const { text } = require('express');
const { json } = require('express/lib/response');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth.js');
const { formatDate, setDate } = require('../utils/helpers.js');

// homepage
// See 4 most recent posts
router.get('/', async (req, res) => {
    try {
        const allPosts = await Post.findAll({
            order: [['createdAt', 'DESC']],
            limit: 4,
            include: [
                {
                    model: User,
                },
                {
                    model: Comment,
                    include: {
                        model: User,
                    }
                },
            ]
        });
        console.log('------------------------------------------------------');
        // const rawPosts = allPosts.map((post) => console.log(post));
        const posts = allPosts.map((post) => post.get({ plain: true }));
        posts.forEach(post => post.createdAt = setDate(post.createdAt));

        res.status(200).render('home-page', { posts, loggedIn: req.session.loggedIn, userSession: req.session.username });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// all-posts
// See all posts
router.get('/all', async (req, res) => {
    try {
        const allPosts = await Post.findAll({
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: User,
                },
                {
                    model: Comment,
                    include: {
                        model: User,
                    }
                },
            ]
        });
        const posts = allPosts.map((post) => post.get({ plain: true }));
        posts.forEach(post => post.createdAt = setDate(post.createdAt));

        res.status(200).render('all-posts', { posts, loggedIn: req.session.loggedIn, userSession: req.session.username });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// See specific post
router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                },
                {
                    model: Comment,
                    include: {
                        model: User,
                    }
                },
            ]
        });
        if (!postData) {
            res.status(404).json({ message: 'No post with this ID!' });
            return;
        };
        const post = postData.get({ plain: true });
        const comments = post.comments;
        post.createdAt = setDate(post.createdAt);
        
        res.render('single-post', { post, comments, loggedIn: req.session.loggedIn, userSession: req.session.username });
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
