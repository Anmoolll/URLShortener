import express from 'express'
import { URL } from '../models/url.js';
import { restrictTo } from '../middleware/auth.js';
const router = express.Router();

router.get('/', restrictTo(["NORMAL"]) ,async (req, res) => {

    const allURL = await URL.find({createdBy: req.user._id});
    return res.render('home', {
        urls: allURL,
    });
})

router.get('/signup', (req, res) => {
    return res.render("signup")
})

router.get('/login', (req, res) => {
    return res.render("login")
})

export default router