import mongoose,{Schema}from "mongoose"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema(
    {
        username: {
            type:String,
            required: true,
            unique:true,
            trim:true,
            index:true
        },
        email: {
            type:String,
            required: true,
            unique:true,
            trim:true,
            index:true
        },
        fullName: {
            type:String,
            required: true,
            unique:true,
            trim:true,
            index:true
        },
        avatar: {
            type:String,   //cloudray api
            required: true,
            
        },
        coverImage:{
            type:String,
            
        },
        watchHistory:[
            {
                type:Schema.Types.ObjectId,
                ref: "Video",
            }
        ],
        password:{
            type:String,
            required: [true, "PAssword is must"],

        },
        refreshToken:{
            type:String,

        }




}
,{
    timestamps:true,

}
)
userSchema.pre("save", async function(next) {
    if(!this.isModified("password"))  return next();
    this.password = bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAcessToken = function(){
  return  jwt.sign(
        {
           _id: this._id,
           email : this.email,
           username: this.username,
           fullName: this.fullName
    },process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)
}

userSchema.meethod.generateRefreshToken = function(){
    return  jwt.sign(
        {
           _id: this._id,
           email : this.email,
           username: this.username,
           fullName: this.fullName
    },process.env.REEFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
)
}

export const User = mongoose.model("User",userSchema)