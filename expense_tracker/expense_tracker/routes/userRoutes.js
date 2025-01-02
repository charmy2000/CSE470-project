const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../controllers/userController');
const userMiddleware = require('../middlewares/userMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

// Protected
router.get('/profile', userMiddleware, (req, res) => {
  res.json({ message: 'Welcome to your profile!', user: req.user });
});

module.exports = router;

