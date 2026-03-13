import user from '../models/user.js';
import {setUser} from '../service/auth.js';

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

    const token = setUser(User);
    // store the JWT in a cookie so auth middleware can read it
    res.cookie('token', token);
    res.redirect("/");
}


