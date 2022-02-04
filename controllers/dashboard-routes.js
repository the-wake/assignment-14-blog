const router = require('express').Router();
const { Post } = require('../models');
const withAuth = require('../utils/auth.js');


// dashboard
// show all of my posts
router.get('/',withAuth, async (req, res) => {
    // res.send('hello')
    try {
        const allPosts = await Post.findAll();
        const posts = allPosts.map((post) => post.get({ plain: true }));
        console.log("post", posts);
        res.json(posts)
        // res.render('all-posts-admin',{layout: 'dashboard', posts, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// router.get('/test', withAuth, async(req,res)=>{
// // res.send("test hello")
// try {
//             const allPosts = await Post.findAll();
//             const posts = allPosts.map((post) => post.get({ plain: true }));
//             // console.log("post", posts);
//             // res.json(posts)
//             res.render('all-posts-admin', {layout: 'dashboard', posts, loggedIn: req.session.loggedIn });
//         } catch (err) {
//             console.log(err);
//             res.status(500).json(err);
//         }
// })

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
