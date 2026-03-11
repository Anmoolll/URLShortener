import jwt from 'jsonwebtoken';

export function setUser(user){
    return jwt.sign({
        _id: user._id,
        email: user.email,
    },
    process.env.JWT_SECRET,);
}

export function getUser(token){
    if(!token) return null;
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        // log the issue and return null so callers can handle unauthenticated case
        console.error('Failed to verify JWT:', err.message);
        return null;
    }
}

