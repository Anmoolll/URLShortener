import express from 'express'
import { URL } from '../models/url.js';
const router = express.Router();

router.get('/', async (req, res) => {
    const allURL = await URL.find({});
    return res.render('home', {
        urls: allURL,
    });
})

export default router