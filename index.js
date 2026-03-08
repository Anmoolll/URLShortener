import express from 'express';
import urlRoute from './routes/url.js'
import connectToDB from './connect.js';
import dotenv from "dotenv";
import { URL } from './models/url.js';
import path from 'path'
import staticRouter from './routes/staticRouter.js'

const app = express();
const PORT = 3000;

dotenv.config();
connectToDB();

app.set("view engine", "ejs")
app.set("views", path.resolve('./views'))

app.use(express.json())
app.use(express.urlencoded({ extended : false }))

app.use('/', staticRouter)
app.use('/url', urlRoute)
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

    res.redirect(entry.redirectURL);
})

app.listen(PORT, () => console.log(`Server started on ${PORT}`))

