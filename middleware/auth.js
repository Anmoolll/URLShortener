import {getUser} from '../service/auth.js'

export function checkForAuthentication(req, res, next){
    const AuthorizationHeaderValue = req.headers["authorization"];
    req.user = null;

    if(!AuthorizationHeaderValue || 
        !AuthorizationHeaderValue.startsWith("Bearer ")){
        return next();
    }

    const token = AuthorizationHeaderValue.split("Bearer ")[1];
    const user = getUser(token);

    req.user = user;
    return next()
}

export function restrictTo(roles = []){
    return function (req, res, next){
        if(!req.user){
            return res.redirect("/login");
        }

        if(!roles.includes(req.user.role)) return res.end("Unauthorized");

        return next();
    }
}