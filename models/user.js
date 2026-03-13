import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    Role:{
        type: String,
        required: true,
        default: "NORMAL"
    }
}, 
{ timestamps: true});

const user = mongoose.model("user", userSchema);

export default user;

