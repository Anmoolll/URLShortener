import express from 'express';
import connectToDB from './connect.js';
import dotenv from "dotenv";
import { URL } from './models/url.js';
import path from 'path'
import cookieParser from 'cookie-parser';
import { checkForAuthentication, restrictTo } from './middleware/auth.js'

import staticRouter from './routes/staticRouter.js'
import urlRoute from './routes/url.js'
import userRoute from './routes/user.js'

const app = express();
const PORT = 3000;

dotenv.config();
connectToDB();

app.set("view engine", "ejs")
app.set("views", path.resolve('./views'))

app.use(express.json())
app.use(express.urlencoded({ extended : false }))
app.use(cookieParser())
app.use(checkForAuthentication())

app.use('/url', restrictTo("NORMAL") ,urlRoute)
app.use('/user', userRoute)
app.use('/', staticRouter)


app.use('/:shortID', async (req, res) => {
    const shortID = req.params.shortID;
    const entry = await URL.findOneAndUpdate({
        shortID: shortID
    }, {$push : {
        visitHistory : {
            timestamp : Date.now(),
        }
        }
    })

    if (!entry) {
        return res.status(404).json({ error: 'Short URL not found' });
    }

    res.redirect(entry.redirectURL);
})

app.listen(PORT, () => console.log(`Server started on ${PORT}`))