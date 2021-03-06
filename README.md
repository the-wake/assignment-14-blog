# Assignment 14: Full-Stack Blog

## Description
This is a full-stack blog webpage hosted via GitHub and deployed via Heroku.

[GitHub Repository](https://github.com/the-wake/assignment-14-blog)

[Heroku Live Link](https://vast-citadel-10428.herokuapp.com)

## Installation
No installation is required. This application is hosted via GitHub, with a live link deployed on [Heroku](https://vast-citadel-10428.herokuapp.com).

![Demonstration screenshot](/assets/Demo-Screenshot.png)

## Usage
Users can see the most recent posts from the homepage, but to access further functionality, they will need to create an account. Once an account is created (and the user is logged in), they will be able to create posts, edit their own posts, and comment on other users' posts (and their own).

## Functionality
The webpage will validate user login status via the session at most steps, requiring login if not logged in. Since the application is primarily run on the server side, most functionality is handled via the server requesting and rendering information to the user via fetch requests, express, MySQL2, and Sequelize.

## Tools Used
* JavaScript
* MySQL
* Sequelize
* Express.js
* Node.js
* NPM
* nodemon
* bcrypt
* Heroku
* GitHub
* GitBash
* Coded in VS Code

## Future Functionality
* The security could definitely be imporved, even with the few features I added to prevent easy manipulation of others' posts.
* On that note, more robust account creation features would be an easy target for early improvements.
* Comments could become editable.
* A search feature could be implemented.
