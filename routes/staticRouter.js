import express from 'express'
import { URL } from '../models/url.js';
const router = express.Router();

router.get('/', async (req, res) => {
    const allURL = await URL.find({});
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