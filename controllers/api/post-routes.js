const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth.js');

// /api/posts
// Get all posts

// Create a post
router.post('/', withAuth, async (req, res) => {
    // console.log(req.session.userId);
    try {
        const postData = await Post.create({
            title: req.body.title,
            body: req.body.body,
            userId: req.session.userId,
            // username: req.session.username,
        });
        // console.log(postData.dataValues);

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

router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatedPost = await Post.update({
            title: req.body.title,
            body: req.body.body,
        },
        {
            where: {
                id: req.params.id,
            }
        });
        res.status(200).json(updatedPost);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
