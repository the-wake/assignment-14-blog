const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth.js');

// /api/posts
// Get all posts
router.get('/', async (req, res) => {
    try {
        const allPosts = await Post.findAll().catch((err) => {
            res.json(err);
        });
        const posts = allPosts.map((post) => post.get({ plain: true }));
        res.status(200).render('all-posts', { posts, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Get specific post
router.get('/:id', withAuth, async (req, res) => {
    try {
        res.status(200).render('single-post', { loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Create a post
router.post('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.create({
            title: req.body.title,
            body: req.body.body,
        });

        // const allPosts = await Post.findAll().catch((err) => {
        //     res.json(err);

        // });
        // const posts = allPosts.map((post) => post.get({ plain: true }));
        // res.status(200).render('all-posts', { posts, loggedIn: req.session.loggedIn });

        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).render('all-posts-admin', { layout: 'dashboard', loggedIn: req.session.loggedIn });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
