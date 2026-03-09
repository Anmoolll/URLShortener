import user from '../models/user.js';
import { v4 } from 'uuid';
import {setUser} from '../service/auth.js'

export async function handleUserSignup(req, res){
    const {name, email, password } = req.body;
    await user.create({
        name,
        email,
        password
    });

    console.log("New user created!")

    res.redirect("/");
}

export async function handleUserLogin(req, res){
    const { email, password } = req.body;
    const User = await user.findOne({ email, password })

    if(!User) return res.render("login", {
        error: "Invalid email or password"
    })

    const sessionId = v4();
    setUser(sessionId, User);
    res.cookie('uuid', sessionId);
    res.redirect("/");
}


