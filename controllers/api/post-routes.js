const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth.js');

// /api/posts
// Get all posts

// Create a post
router.post('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.create({
            title: req.body.title,
            body: req.body.body,
        });

        // const allPosts = await Post.findAll();
        // const posts = allPosts.map((post) => post.get({ plain: true }));
        // console.log(posts);
        // res.status(200).render('all-posts', { posts, loggedIn: req.session.loggedIn });

        // Get page to render my posts
        // req.session.save(() => {
        //     console.log(req.session);
        //     req.session.loggedIn = true;
        //     res.status(200).render('all-posts-admin', { layout: 'dashboard', loggedIn: req.session.loggedIn });
        // });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
